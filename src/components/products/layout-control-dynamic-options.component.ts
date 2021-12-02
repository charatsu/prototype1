import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/pricing.service';
import * as moment from 'moment';
import { DATE_TIME_CONFIG } from './date-time.config';
import { JsonSchemaFormService } from '@ajsf/core';

import { ProductLayoutControl } from './product-layout-control';

@Component({
  selector: 'app-layout-control-dynamic-options',
  templateUrl: './layout-control-dynamic-options.component.html',
  providers: [PriceService]
})
export class LayoutDynamicSetOfOptionsControlComponent extends ProductLayoutControl implements OnInit {

  constructor(
    public jsf: JsonSchemaFormService,
    private priceService: PriceService,
    public cd: ChangeDetectorRef,
  ) {
    super(jsf, cd);
  }

  async ngOnInit() {
    super.ngOnInit();
    
    if (this.stepItem.lookupName) {
      const start = this.jsModel?.period?.start ? moment.utc(this.jsModel?.period?.start) : moment().utc();
      let lookupOptions = await this.priceService.getLookupOptions(
        this.jsModel.productVersionId.toString(),
        this.stepItem.lookupName,
        start.format(DATE_TIME_CONFIG.dateFormat)
      )
      // .then(
      //   lookupOptions => {
      //     console.log(lookupOptions);
      //     // this.stepItem.sourceLookup = lookupOptions.getModels();
      //   });
      this.stepItem.sourceLookup = lookupOptions.data.reduce((prev, curr) => {
        prev.push(curr.attributes);
        return prev;        
      }, []);
      
    }
    this.jsf.initializeControl(this);

    this.setValidators();
    this.setInitialStatuses();

    this.parent.addControl(this.stepItem.tag, this.formControl);
  }

  get isValid() { return this.parent.controls[this.stepItem.tag].valid; }
}
