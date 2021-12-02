import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';
import { JsonSchemaFormService } from '@ajsf/core';
import { withinBounds } from './validations/validate-date-within-bound';
import { startBeforeEnd } from './validations/validate-date-start-before-end';
import { PipeConfig } from './pipe-config';
import { ProductLayoutControl } from './product-layout-control';
import { takeUntil } from 'rxjs/operators';
import { ProductLayoutModelInterface } from './interfaces/product-layout-model.interface';

@Component({
  selector: 'app-dates-layout',
  templateUrl: './dates.layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatesLayoutComponent extends ProductLayoutControl implements OnInit {
  startDateModel: Date;
  endDateModel: Date;
  effectiveDateModel: Date;

  public startDateControl: AbstractControl;
  public endDateControl: AbstractControl;
  public effectiveDateControl: AbstractControl;
  public formControl: FormGroup;
  public hasEffective = false;
  public minEffectiveDate: string;
  public maxEffectiveDate: string;
  public coverageContinuation = false;

  public isOutOfSequence: boolean;

  constructor(
    public jsf: JsonSchemaFormService,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
  }

  ngOnInit() {
    super.ngOnInit();

    this.jsf.initializeControl(this);
    this.buildValidators();
    this.buildEffectiveValidators();
    this.setValueFromModelPeriod();

    this.parent.addControl('QuotedDatesTag', this.formControl);

    this.formControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      if (this.dirtyModel) {
        this.buildEffectiveValidators();
        this.setValueFromModelPeriod();
        this.dirtyModel = false;
      }
    });
  }

  updateModel(model: ProductLayoutModelInterface): void {
    super.updateModel(model);
    this.dirtyModel = true;
  }

  buildValidators(): void {
    this.startDateControl = this.formControl.controls['StartDateTag'];
    this.startDateControl.setValidators(Validators.required);

    this.endDateControl = this.formControl.controls['EndDateTag'];
    this.endDateControl.setValidators(Validators.required);

    this.formControl.setValidators([startBeforeEnd]);
  }

  buildEffectiveValidators(): void {
    this.effectiveDateControl = this.formControl.controls['EffectiveDateTag'];

    if (this.effectiveDateControl) {
      this.effectiveDateControl.setValidators(null);

      const effectiveValidators = new Array<ValidatorFn>();

      if (this.jsModel.effectiveDate) {
        effectiveValidators.push(Validators.required);
        effectiveValidators.push(withinBounds);
      }

      this.effectiveDateControl.setValidators(effectiveValidators);
    }
  }

  setValueFromModelPeriod(init = false): void {    
    this.startDateControl = this.formControl.controls['StartDateTag'];    
    this.startDateModel = new Date(this.jsModel.period.start.substring(0, 10));
    // this.startDateModel = new Date(moment().toLocaleString().substring(0, 10));

    this.endDateControl = this.formControl.controls['EndDateTag'];
    this.endDateModel = new Date(this.jsModel.period.end.substring(0, 10));
    // this.endDateModel = new Date(moment().add(1, 'year').add(-1, 'day').toLocaleString().substring(0, 10));

    // let effectiveDateValue = null;

    // if (this.jsModel.effectiveDate) {
    //   this.hasEffective = true;
    //   effectiveDateValue = new Date(this.jsModel.effectiveDate.substring(0, 10));
    // } else {
    //   this.hasEffective = false;
    // }

    // this.effectiveDateControl = this.formControl.controls['EffectiveDateTag'];

    // if (this.effectiveDateControl) {
    //   this.effectiveDateModel = effectiveDateValue;
    //   this.onEffectiveDateChanged(this.effectiveDateModel);
    // }

    // this.minEffectiveDate = moment.utc(this.startDateModel).format(PipeConfig.calendarDateFormat);
    // this.maxEffectiveDate = moment.utc(this.endDateModel).add(1, 'days').format(PipeConfig.calendarDateFormat);

    // this.coverageContinuation = this.jsModel.sourcePolicyId !== '' && !this.hasEffective;

    this.onStartDateChanged(this.startDateModel);
    this.onEndDateChanged(this.endDateModel);
  }

  get isValid() {
    return ((this.startDateControl.invalid && (this.startDateControl.dirty || this.startDateControl.touched))
      && (this.endDateControl.invalid && (this.endDateControl.dirty || this.endDateControl.touched)));
  }

  public refreshOutOfSequence() {
    if (this.parent.value.QuotedPeriod.EffectiveDateTag) {
      const effective = new Date(Date.parse(this.parent.value.QuotedPeriod.EffectiveDateTag));

      const minEffective = new Date(Date.parse(this.jsModel.attributes.minEffectiveDate));
      this.isOutOfSequence = effective < minEffective;
    }
  }

  onStartDateChanged(value: any): void {
    this.setDateControl(value, this.startDateControl);    
  }

  onEndDateChanged(value: any): void {
    this.setDateControl(value, this.endDateControl);
  }

  onEffectiveDateChanged(value: any): void {
    this.setDateControl(value, this.effectiveDateControl);
  }

  setDateControl(date: any, control: AbstractControl) {
    if (date) {
      const momentDate = moment(date).toDate();

      if (control.value) {
        if (control.value.valueOf() !== momentDate.valueOf()) {
          control.setValue(momentDate);
        }

      } else {
        control.setValue(momentDate);
      }

    } else {
      if (control.value) {
        control.setValue(date);
      }
    }    
  }
}
