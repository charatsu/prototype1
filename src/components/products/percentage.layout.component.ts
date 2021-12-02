import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { NumberLayoutComponent } from './number.layout.component';

@Component({
  selector: 'app-layout-control-number',
  templateUrl: './number.layout.component.html',
  styleUrls: ['./number.layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentageLayoutComponent extends NumberLayoutComponent {
  constructor(
    public jsf: JsonSchemaFormService,
    public injector: Injector,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, injector, cd);
    this.unit = '%';
    this.addonClass = 'inner-addon right-addon';
  }
}
