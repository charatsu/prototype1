import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { ProductLayoutControl } from './product-layout-control';

@Component({
  selector: 'app-static-options-layout',
  templateUrl: './static-options.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticSetOfOptionsLayoutComponent extends ProductLayoutControl implements OnInit {

  constructor(
    public jsf: JsonSchemaFormService,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);

    if (this.stepItem.staticValues) {
      this.stepItem.sourceLookup = this.stepItem.staticValues;
    }

    this.setValidators();
    this.setInitialStatuses();

    this.parent.addControl(this.stepItem.tag, this.formControl);
  }

  get isValid() { return this.parent.controls[this.stepItem.tag].valid; }
}
