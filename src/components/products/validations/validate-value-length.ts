import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validateValueLength(validatorParams: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value !== undefined && control.value !== null) {
      const isValid = String(control.value).length >= validatorParams.minLength 
                    && String(control.value).length <= validatorParams.maxLength;
      return isValid ? null : { validationMessage: validatorParams.validationMessage };
    }
    return null;
  };
}
