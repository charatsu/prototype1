import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'lookupOptions',
  modelEndpointUrl: 'options'
})

export class LookupOption extends JsonApiModel {

  @Attribute()
  display: string;

  @Attribute()
  value: string;
}
