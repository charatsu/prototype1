import { AbstractControl, ValidatorFn } from '@angular/forms';

export function valueMustInRange(validatorParams: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value !== undefined && control.value !== null) {
      const isValid = control.value >= validatorParams.minValue && control.value <= validatorParams.maxValue;
      return isValid ? null : { validationMessage: validatorParams.validationMessage };
    }
    return null;
  };
}
