import { AbstractControl } from '@angular/forms';
import { utc } from 'moment';

export function startBeforeEnd(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value) {
    const start = utc(control.value.StartDateTag).toDate().getTime();
    const end = utc(control.value.EndDateTag).toDate().getTime();
    const bCheckStartBeforeEnd = end < start;
    if (bCheckStartBeforeEnd) {
      return { endDateTooEarly: true };
    }
    return null;
  }
  return null;
}
