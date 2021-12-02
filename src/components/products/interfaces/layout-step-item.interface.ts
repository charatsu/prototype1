import { LookupOption } from './lookup-option.model';
import { QuestionInteraction } from './question-interaction.interface';
import { QuestionValidator } from './question-validator.interface';

export interface LayoutStepItem {
  tag: string;
  identity: string;
  title: string;
  type: string;
  defaultValue?: string;
  staticValues?: LookupOption[];
  lookupName?: string;
  isReadOnly: boolean;
  isRequired?: boolean;
  min: any;
  max: any;
  minLength: any;
  maxLength: any;
  minDate: any;
  maxDate: any;
  minSize: any;
  maxSize: any;
  allowedExtensions?: any[];
  validators: QuestionValidator[];
  interactions: QuestionInteraction[];
  sourceLookup?: LookupOption[];
  defaultFromCustomer?: string;
  text: string;
  pattern?: string;
}
