import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { ProductLayoutControl } from './product-layout-control';

@Component({
  selector: 'app-label-layout',
  templateUrl: './label.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelLayoutComponent extends ProductLayoutControl implements OnInit {

  constructor(
    public jsf: JsonSchemaFormService,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf,cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);
  }
}
