import { JsonApiModel } from 'angular2-jsonapi';

export interface ProductLayoutModelInterface extends JsonApiModel {
  sourcePolicyId: string;
  productVersionId: string;
  period: {
    start: string;
    end: string;
  };
  effectiveDate: string;
  scope: string;
  currencyCode: string;
  answers: object;
}
