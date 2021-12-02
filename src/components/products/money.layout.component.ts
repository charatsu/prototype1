import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { NumberLayoutComponent } from './number.layout.component';

@Component({
  selector: 'app-money-layout',
  templateUrl: './number.layout.component.html',
  styleUrls: ['./number.layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyLayoutComponent extends NumberLayoutComponent implements OnInit {

  constructor(
    public jsf: JsonSchemaFormService,
    public injector: Injector,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf,  injector, cd);
    this.addonClass = 'inner-addon right-addon';
  }

  ngOnInit() {
    super.ngOnInit();
    this.unit = this.jsModel?.currencyCode;
  }
}
