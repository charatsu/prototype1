import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { ProductLayoutControl } from './product-layout-control';

@Component({
  selector: 'app-multiline-text-layout',
  templateUrl: './multiline-text.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilineTextLayoutComponent extends ProductLayoutControl implements OnInit {

  constructor(
    public jsf: JsonSchemaFormService,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);

    this.setValidators();
    this.setInitialStatuses();

    this.parent.addControl(this.stepItem.tag, this.formControl);
  }

  get isValid() {
    return this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
  }
}
