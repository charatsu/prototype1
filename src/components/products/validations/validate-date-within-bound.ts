import { AbstractControl } from '@angular/forms';
import { utc } from 'moment';

export function withinBounds(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value) {
    const start = utc(control.value.StartDateTag).toDate().getTime();
    const end = utc(control.value.EndDateTag).toDate().getTime();
    const effective = utc(control.value.EffectiveDateTag).toDate().getTime();
    const effectiveOutOfBounds = effective < start || end < effective;
    if (effectiveOutOfBounds) {
      return { effectiveDateOutOfBounds: true };
    }
    return null;
  }
  return null;
}
