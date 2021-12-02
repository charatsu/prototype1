import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { NumberLayoutComponent } from './number.layout.component';

@Component({
  selector: 'app-integer-layout',
  templateUrl: './number.layout.component.html',
  styleUrls: ['./number.layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegerLayoutComponent extends NumberLayoutComponent {

  constructor(
    public jsf: JsonSchemaFormService,
    public injector: Injector,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, injector, cd);
    this.integerOnly = true;
  }
}
