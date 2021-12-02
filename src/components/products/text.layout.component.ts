import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, InjectionToken, Injector, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { ValidatorBuilder } from './validations/validators';
import { QuestionValidator } from './interfaces/question-validator.interface';
import { ProductLayoutControl } from './product-layout-control';
import { JsonApiDatastore } from 'angular2-jsonapi';
import { LOOKUP_VALIDATION_SERVICE_TOKEN } from './interfaces/token-define';

@Component({
  selector: 'app-text-layout',
  templateUrl: './text.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLayoutComponent extends ProductLayoutControl implements OnInit {
  lookupValidationService: JsonApiDatastore;
  public numberOnly = false;

  constructor(
    public jsf: JsonSchemaFormService,
    public injector: Injector,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
    // this.lookupValidationService = this.injector.get<JsonApiDatastore>(LOOKUP_VALIDATION_SERVICE_TOKEN);
  }

  // @todo: need review on scenarios of value changes.
  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);

    this.setValidators();
    this.setInitialStatuses();

    this.parent.addControl(this.stepItem.tag, this.formControl);
  }

  get isValid() { return this.formControl.invalid && (this.formControl.dirty || this.formControl.touched); }

  public setValidators() {
    const effectiveDate = this.getEffectiveDate();
    const extraData = {
      // lookupValidationService: this.lookupValidationService,
      lookupName: this.stepItem.lookupName,
      productVersionId: this.jsModel.productVersionId,
      effectiveDate: effectiveDate,
    };
    const validatorFns = ValidatorBuilder.createStepItemValidatorFunctions(this.stepItem, extraData);
    this.formControl.setValidators(validatorFns);

    const hasLookupValidation = this.stepItem.validators?.find(x => x.key === 'lookupKeyMustValid');
    if (!hasLookupValidation && this.stepItem.lookupName) {
      const lookupKeyMustValid: QuestionValidator = {
        key: 'lookupKeyMustValid',
        validatorParams: { validationMessage: 'MODULE SALES INVALID LOOKUP VALUE' }
      };
      this.stepItem.validators.push(lookupKeyMustValid);
    }
    const asyncValidatorFns = ValidatorBuilder.createAsyncValidatorFunctions(this.stepItem.validators, extraData);
    this.formControl.setAsyncValidators(asyncValidatorFns);
    setTimeout(() => {
      this.formControl.updateValueAndValidity();
    }, 500);
  }

  public checkNumber(event) {
    const regExp = new RegExp(/^[0-9]*$/);
    return (regExp.test(event.target.value + event.key) || regExp.test(event.key + event.target.value));
  }

  public replaceNaN(event) {
    const regExp = new RegExp(/[^0-9]/g);
    return event.target.value.replace(regExp, '');
  }

  private getEffectiveDate() {
    const quoteDateControls = this.parent.controls.QuotedDatesTag as FormGroup;
    const effectiveDate = quoteDateControls?.controls.StartDateTag.value;
    return effectiveDate;
  }
}
