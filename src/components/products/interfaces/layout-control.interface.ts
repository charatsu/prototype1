export interface LayoutControl {
  isShow: boolean;
  controlName?: string;
  showComponent(flag: boolean, defaultValue?: any, emitChange?: any): void;
  populateValue(value: string, emitChange?: any): void;
  disableComponent(disable: boolean, defaultValue?: any);
  clearDependentValues(targetQuestions: string[]);
}
