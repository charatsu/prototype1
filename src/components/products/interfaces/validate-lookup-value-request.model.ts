import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'validateLookupValueRequests',
  modelEndpointUrl: 'validateLookupValueRequest'
})

export class ValidateLookupValueRequest extends JsonApiModel {
  @Attribute()
  productVersionId: string;

  @Attribute()
  lookupName: string;

  @Attribute()
  lookupValue: any;

  @Attribute()
  organisationContext: string;

  @Attribute()
  effectiveDate: string;
}
