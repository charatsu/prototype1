import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { SelectListOption } from './interfaces/select-list-option.interface';
import { ProductLayoutControl } from './product-layout-control';

@Component({
  selector: 'app-yes-no-layout',
  templateUrl: './yes-no.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YesNoLayoutComponent extends ProductLayoutControl implements OnInit {

  public options: Array<SelectListOption>;

  constructor(
    public jsf: JsonSchemaFormService,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);

    this.options = [
      { value: null, displayValue: 'Please Select'},
      { value: true, displayValue: 'Yes' },
      { value: false, displayValue: 'No' }
    ];

    // TODO: do required dropdown validation, i.e. Please Select not allowed
    this.setValidators();
    this.setInitialStatuses();

    this.parent.addControl(this.stepItem.tag, this.formControl);
  }

  public get isValid() { return this.parent.controls[this.stepItem.tag].valid; }
}
