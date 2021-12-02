export interface ValidationError {
  propertyName: string;
  message: string;
  attemptedValue: any;
  repeatingValidationErrors?: any;
}
