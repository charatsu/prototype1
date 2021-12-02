import { ChangeDetectionStrategy, ChangeDetectorRef, Component, InjectionToken, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonSchemaFormService } from '@ajsf/core';
import { ValidatorBuilder } from './validations/validators';
import { QuestionValidator } from './interfaces/question-validator.interface';
import { ProductLayoutControl } from './product-layout-control';
import { JsonApiDatastore } from 'angular2-jsonapi';

@Component({
  selector: 'app-number-layout',
  templateUrl: './number.layout.component.html',
  styleUrls: ['./number.layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberLayoutComponent extends ProductLayoutControl implements OnInit {
  lookupValidationService: JsonApiDatastore;
  LOOKUP_VALIDATION_SERVICE_TOKEN = new InjectionToken<JsonApiDatastore>('LOOKUP_VALIDATION_SERVICE_TOKEN');
  unit = '';
  addonClass = '';
  integerOnly = false;

  constructor(
    public jsf: JsonSchemaFormService,
    public injector: Injector,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
    // this.lookupValidationService = this.injector.get<JsonApiDatastore>(this.LOOKUP_VALIDATION_SERVICE_TOKEN);
  }

  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);

    this.setValidators();
    this.setInitialStatuses();

    this.parent.addControl(this.stepItem.tag, this.formControl);

  }

  get isValid() { return this.parent.controls[this.stepItem.tag].valid; }

  public setValidators() {
    const quoteDateControls = this.parent.controls.QuotedDatesTag as FormGroup;
    const effectiveDate = quoteDateControls?.controls.StartDateTag.value;
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
    this.formControl.updateValueAndValidity();
    setTimeout(() => {
      this.formControl.updateValueAndValidity();
    }, 500);
  }

  public checkInteger(event) {
    const regExp = /^-?[0-9]*$/;
    return (regExp.test(event.target.value + event.key) || regExp.test(event.key + event.target.value));
  }

}
