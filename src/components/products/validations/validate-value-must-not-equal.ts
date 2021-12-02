import { AbstractControl, ValidatorFn } from '@angular/forms';

export function valueMustNotEqual(validatorParams: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value !== undefined && control.value !== null) {
      const isValid = control.value !== validatorParams.validationInput;
      return isValid ? null : { validationMessage: validatorParams.validationMessage };
    }
    return null;
  };
}
