import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import StringHelper from './string.helper';

export class ValidatorExtensions {

  static lessThan(compareValue: number, options?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (compareValue == null) {
        return null;
      }
      if (control.value == null || control.value.length === 0) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value >= compareValue ? { 'lessThan': { 'expectLessThan': compareValue, 'actual': control.value }, 'validationMessage': options?.validationMessage ?? ValidatorExtensions.lessThanValidationMessage(compareValue) } : null;
    };
  }

  static lessThanValidationMessage(value) {
    return 'FORMLY LESS THAN ' + value + ' MESSAGE';
  }

  static greaterThan(compareValue: number, options?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (compareValue == null) {
        return null;
      }
      if (control.value == null || control.value.length === 0) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value <= compareValue ? { 'greaterThan': { 'expectGreaterThan': compareValue, 'actual': control.value }, 'validationMessage': options?.validationMessage ?? ValidatorExtensions.greaterThanValidationMessage(compareValue)  } : null;
    };
  }

  static greaterThanValidationMessage(value) {
    return 'FORMLY GREATER THAN ' + value + ' MESSAGE';
  }

  static mustContainString(str: string, options?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (StringHelper.isNullOrWhiteSpace(str)) {
        return null;
      }

      if (StringHelper.isNullOrWhiteSpace(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }

      return control.value.indexOf(str) > -1 ? null: { 'validationMessage': options?.validationMessage ?? ValidatorExtensions.mustContainStringValidationMessage(str) };
    };
  }

  static mustContainStringValidationMessage(value) {
    return 'FORMLY MUST CONTAIN ' + value + ' STRING MESSAGE';
  }
  
  static mustNotContainString(str: string, options?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (StringHelper.isNullOrWhiteSpace(str)) {
        return null;
      }

      if (StringHelper.isNullOrWhiteSpace(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }

      return control.value.toLowerCase().indexOf(str.toLowerCase()) === -1 ? null: { 'validationMessage': options?.validationMessage ?? ValidatorExtensions.mustNotContainStringValidationMessage(str) };
    };
  }

  static mustNotContainStringValidationMessage(value) {
    return 'FORMLY MUST NOT CONTAIN ' + value + ' STRING MESSAGE';
  }
}
