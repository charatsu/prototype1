import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { ValidateLookupValueRequest } from '../components/products/interfaces/validate-lookup-value-request.model';

const config: DatastoreConfig = {
  baseUrl: 'https://api.seamless.insure/pricing/api/v1',
  apiVersion: 'productLookupValidations',
  models: {
    validateLookupValueRequest: ValidateLookupValueRequest
  }
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class ProductLookupValidationService extends JsonApiDatastore {
}
