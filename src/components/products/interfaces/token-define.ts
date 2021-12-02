import { InjectionToken } from '@angular/core';
import { JsonApiDatastore } from 'angular2-jsonapi';

export const LOOKUP_VALIDATION_SERVICE_TOKEN = new InjectionToken<JsonApiDatastore>('LOOKUP_VALIDATION_SERVICE_TOKEN');
