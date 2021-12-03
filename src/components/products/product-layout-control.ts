import { ChangeDetectorRef, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { FormGroup } from '@angular/forms';
import { JsonApiModel } from 'angular2-jsonapi';

import { LayoutControl } from './interfaces/layout-control.interface';
import { LayoutStepItem } from './interfaces/layout-step-item.interface';
import { QuestionValidator } from './interfaces/question-validator.interface';
import { ProductLayoutModelInterface } from './interfaces/product-layout-model.interface';
import { ValidationError } from './interfaces/validation-error.interface';
import { Subject } from 'rxjs';
import { ValidatorBuilder } from './validations/validators';

@Injectable()
export abstract class ProductLayoutControl implements LayoutControl, OnInit, OnDestroy {
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  // AbstractControl;
  public formControl: any;
  public isInitialLoad = true;
  public isShow = true;
  public isRequired = false;
  public validationMessage = '';
  public dirtyModel = false;
  public onDestroy$ = new Subject();

  public parent: FormGroup;
  public stepItem: LayoutStepItem;
  public jsModel: ProductLayoutModelInterface;

  constructor(
    public jsf: JsonSchemaFormService,
    public cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.initLayout();
    this.assignController();
  }

  assignController() {
    setTimeout(() => {
      if (this.formControl) {
        this.formControl.controller = this;
      }      
    }, 300);
  }

  updateModel(model: ProductLayoutModelInterface): void {    
    this.jsModel = model;
    this.setInitialStatuses();
    this.updateValidationErrors();
    this.cd.markForCheck();
  }

  ngOnDestroy() {
    this.updateValidationErrors();
    this.onDestroy$.next('');
    this.onDestroy$.complete();
  }

  public get itemIndex() {
    return (this.dataIndex && this.dataIndex.length) ? this.dataIndex[0] : 0;
  }

  protected initLayout() {    
    this.parent = this.jsf.formGroup;
    this.stepItem = this.layoutNode.options;
    this.jsModel = this.jsf.formValues;
  }

  public setValidators() {
    const validatorFns = ValidatorBuilder.createStepItemValidatorFunctions(this.stepItem);
    this.formControl.setValidators(validatorFns);
  }

  public setInitialStatuses() {
    this.setReadOnlyStatus();
    this.setRequiredFieldStatus();
  }

  public showComponent(flag: boolean, defaultValue?: any, emitChange?: boolean) {
    if (flag) {
      this.isShow = true;
      if (defaultValue !== undefined && defaultValue != null && !this.isInitialLoad) {
        this.formControl.setValue(defaultValue);
        this.isInitialLoad = false;
      }
    } else {
      this.isShow = false;
      this.formControl.setValue(null);
      this.isInitialLoad = false;
    }

    this.cd.markForCheck();
  }

  public populateValue(value: any, emitChange?: any) {
    this.formControl.setValue(value);
  }

  public clearDependentValues(targetQuestions: string[]) {
    for (const targetQuestion of targetQuestions) {
      const targetControl = this.jsf.formGroup.controls[targetQuestion];

      targetControl.setValue(null);
    }
  }

  public disableComponent(disable: boolean) {
    if (disable) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  public getRequiredQuestions() {
    return this.getRequiredQuestionsValidator().validatorParams.questions.map((x: any) => x.questionName);
  }

  public getRequiredQuestionsValidator(): any {
    return this.stepItem.validators.find(x => x.key === 'requiredQuestions');
  }

  private setReadOnlyStatus() {
    if (this.stepItem.isReadOnly) {
      this.formControl.disable();
    }
  }

  private setRequiredFieldStatus() {
    this.isRequired = this.checkRequiredItem(this.stepItem);
    
    if (this.jsModel.hasValidationErrors && this.jsModel.hasValidationErrors()) {
      const firstValidationError = this.getFirstValidationError(this.jsModel, this.stepItem, this.itemIndex);
      this.validationMessage = firstValidationError.validationMessage;
      if (!this.isRequired && firstValidationError.isRequired) {
        this.isRequired = true;
      }
    } else {
      this.validationMessage = '';
    }
  }

  private checkRequiredItem(item: LayoutStepItem) {
    let required = false;
    try {
      if (!item.isRequired) {
        if (item.validators) {
          required = item.validators.some((validator: QuestionValidator) => validator.key === 'required');
        }
      }
    } catch (e) {
    }
    return required;
  }

  private getFirstValidationError(model: JsonApiModel, item: any, itemIndex?: number) {
    const firstError = {
      isRequired: false,
      validationMessage: '',
    };

    let validationError = this.getValidationErrorByTag(model, item.tag);
    if (validationError?.repeatingValidationErrors) {
      const repeatingValidationErrors = this.getRepeatingValidationErrorsByIndex(validationError, itemIndex);
      validationError = repeatingValidationErrors?.find(x => x.propertyName === item.identity);
    }

    if (validationError) {
      if (validationError.attemptedValue == null && validationError.message.indexOf('required') > 0) {
        firstError.isRequired = true;
        firstError.validationMessage = `${item.title} ${'MODULE SALES IS REQUIRED'}`;
      } else {
        firstError.validationMessage = validationError.message.replace(item.tag, item.title).replace(item.identity, item.title);
      }
    }
    return firstError;
  }

  private updateValidationErrors() {
    const validationError: ValidationError = this.getValidationErrorByTag(this.jsModel, this.stepItem.tag);
    const repeatingValidationErrors = this.getRepeatingValidationErrorsByIndex(validationError, this.itemIndex);
    if (repeatingValidationErrors) {
      const filteredErrors = validationError.repeatingValidationErrors.filter((x: any) => x.rowIndex !== this.itemIndex);
      filteredErrors.forEach((item: any) => {
        if (item.rowIndex > 0 && item.rowIndex >= this.itemIndex) {
          item.rowIndex--;
        }
      });
      validationError.repeatingValidationErrors = filteredErrors;
    }
  }

  private getValidationErrorByTag(model: JsonApiModel, questionTag: string) {
    return model.validationErrors?.find((x: any) => x.propertyName === questionTag);
  }

  private getRepeatingValidationErrorsByIndex(validationError: ValidationError, itemIndex: number) {
    if (validationError?.repeatingValidationErrors?.length) {
      return validationError?.repeatingValidationErrors?.find((e: any) => e.rowIndex === itemIndex)?.errors;
    }
    return null;
  }
}
