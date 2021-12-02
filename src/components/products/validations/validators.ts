import { ValidatorFn, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { validateValueLength } from './validate-value-length';
import { valueMustInRange } from './validate-value-must-in-range';
import { valueMustNotEqual } from './validate-value-must-not-equal';
import { PipeConfig } from '../pipe-config';
import { LayoutStepItem } from '../interfaces/layout-step-item.interface';
import { QuestionValidator } from '../interfaces/question-validator.interface';
import { ValidatorExtensions } from './validator-extensions';

const ValidatorMapping = new Map<string, ValidatorFactory>([
  ['required', p => Validators.required],
  ['maxLength', p => Validators.maxLength(p.max)],
  ['range', p => Validators.compose([Validators.min(p.min), Validators.max(p.max)])],
  ['valueMustNotEqual', p => valueMustNotEqual(p)],
  ['valueMustInRange', p => valueMustInRange(p)],
  ['validateValueLength', p => validateValueLength(p)],
  ['lessThan', p => ValidatorExtensions.lessThan(p.maxValue, { validationMessage: p.validationMessage })],
  ['greaterThan', p => ValidatorExtensions.greaterThan(p.minValue, { validationMessage: p.validationMessage })],
  ['rangeInclusive', p => Validators.compose([Validators.min(p.min), Validators.max(p.max)])],
  ['rangeExclusive', p => Validators.compose([ValidatorExtensions.greaterThan(p.minValue, { validationMessage: p.validationMessage }), ValidatorExtensions.lessThan(p.maxValue, { validationMessage: p.validationMessage })])],
  ['mustContainString', p => ValidatorExtensions.mustContainString(p.validationText, { validationMessage: p.validationMessage })],
  ['mustNotContainString', p => ValidatorExtensions.mustNotContainString(p.validationText, { validationMessage: p.validationMessage })],
]);

const AsyncValidatorMapping = new Map<string, AsyncValidatorFactory>();

export class ValidatorBuilder {

  static FORMAT_DATE =  PipeConfig.dateTimeFormat;

  public static createValidatorFunctions(validators: QuestionValidator[], extraData?: any): ValidatorFn[] {
    const result = new Array<ValidatorFn>();
    if (validators) {
      validators.forEach(validator => {
        const matchingValidatorFactory = ValidatorMapping.get(validator.key);
        
        if (matchingValidatorFactory) {
          result.push(matchingValidatorFactory(validator.validatorParams, extraData));
        }
      });
    }
    return result;
  }

  public static createStepItemValidatorFunctions(stepItem: LayoutStepItem, extraData?: any): ValidatorFn[] {
    const result = this.createValidatorFunctions(stepItem.validators, extraData);
    if (!isNaN(Number(stepItem.min))) {
      result.push(Validators.min(stepItem.min));
    }
    if (!isNaN(Number(stepItem.max))) {
      result.push(Validators.max(stepItem.max));
    }
    if (stepItem.minLength) {
      result.push(Validators.minLength(stepItem.minLength));
    }
    if (stepItem.maxLength) {
      result.push(Validators.maxLength(stepItem.maxLength));
    }
    if (stepItem.minDate) {
      result.push(this.minDate(stepItem.minDate));
    }
    if (stepItem.maxDate) {
      result.push(this.maxDate(stepItem.maxDate));
    }
    return result;
  }

  public static minDate(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value, this.FORMAT_DATE);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isAfter(validationDate) ? null : {
        'minDate': {
          'minDate': validationDate.format(this.FORMAT_DATE),
          'actual': controlDate.format(this.FORMAT_DATE)
        }
      };
    };
  }

  public static maxDate(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }

      const controlDate = moment(control.value, this.FORMAT_DATE);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isBefore(validationDate) ? null : {
        'maxDate': {
          'maxDate': validationDate.format(this.FORMAT_DATE),
          'actual': controlDate.format(this.FORMAT_DATE)
        }
      };
    };
  }

  public static createAsyncValidatorFunctions(validators: QuestionValidator[], extraData?: any): AsyncValidatorFn[] {
    const result = new Array<AsyncValidatorFn>();
    if (validators) {
      validators.forEach(validator => {
        const matchingAsyncValidatorFactory = AsyncValidatorMapping.get(validator.key);
        if (matchingAsyncValidatorFactory) {
          result.push(matchingAsyncValidatorFactory(validator.validatorParams, extraData));
        }
      });
    }
    return result;
  }

  public static registerValidators(arrValidator: [[string, ValidatorFactory]]): void {
    for (const interaction of arrValidator) {
      ValidatorMapping.set(interaction[0], interaction[1]);
    }
  }

  public static registerAsyncValidators(arrValidator: [[string, AsyncValidatorFactory]]): void {
    for (const interaction of arrValidator) {
      AsyncValidatorMapping.set(interaction[0], interaction[1]);
    }
  }
}

export type ValidatorFactory = (params: any, extraData?: any) => ValidatorFn;
export type AsyncValidatorFactory = (params: any, extraData?: any) => AsyncValidatorFn;

