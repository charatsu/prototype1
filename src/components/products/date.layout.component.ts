import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { JsonSchemaFormService } from '@ajsf/core';
import { takeUntil } from 'rxjs/operators';
import { ProductLayoutControl } from './product-layout-control';

@Component({
  selector: 'app-date-layout',
  templateUrl: './date.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateLayoutComponent extends ProductLayoutControl implements OnInit {
  public dateModel: Date;
  isDisabled: boolean;

  constructor(
    public jsf: JsonSchemaFormService,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);

    let initialValue = this.jsModel.answers[this.stepItem.tag];
    if (Array.isArray(initialValue)) {
      const rowIndex = this.dataIndex[0];
      initialValue = this.getValueFromArrayObject(initialValue, rowIndex, this.stepItem.identity);
    }
    this.dateModel = initialValue ? new Date(initialValue) : null;
    this.onDateChanged(this.dateModel, true);

    this.setValidators();
    this.setInitialStatuses();

    this.parent.addControl(this.stepItem.tag, this.formControl);

    this.formControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value) => {
      if (this.formControl.value == null) {
        this.dateModel = null;
      } else {
        this.dateModel = new Date(this.formControl.value);
      }
      this.cd.markForCheck();
    });
  }

  get isValid() {
    return this.parent.controls[this.stepItem.tag].valid;
  }

  onDateChanged(value: any, emitChange?: any): void {
    if (value) {
      this.dateModel = value != null ? new Date(value) : null;
      this.formControl.setValue(moment(this.dateModel).toISOString());
    } else {
      this.formControl.setValue(null);
      this.dateModel = null;
    }
  }

  public disableComponent(disable: boolean) {
    if (disable) {
      this.formControl.disable();
      this.isDisabled = true;
    } else {
      this.formControl.enable();
      this.isDisabled = false;
    }
  }

  private getValueFromArrayObject(arrayObject: any, index: number, key: string) {
    if (arrayObject?.length > index && index >= 0) {
      return arrayObject[index][key];
    }
    return null;
  }

  public populateValue(value: any, emitChange?: any) {
    this.onDateChanged(value, emitChange);
  }
}
