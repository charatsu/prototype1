import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector } from '@angular/core';
import { JsonSchemaFormService } from '@ajsf/core';
import { TextLayoutComponent } from './text.layout.component';

@Component({
  selector: 'app-text-number-layout',
  templateUrl: './text.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextNumberLayoutComponent extends TextLayoutComponent {
  constructor(
    public jsf: JsonSchemaFormService,
    public injector: Injector,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, injector, cd);
    this.numberOnly = true;
  }
}
