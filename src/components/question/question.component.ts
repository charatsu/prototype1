import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CTPLmodel, CTPLview, PAattribute, PAmodel, PAview } from '../../assets/constant';
import { PAComponent } from '../pa/pa.component';
import { CTPLComponent } from '../ctpl/ctpl.component';
import * as moment from 'moment';
import { SaleService } from '../../services/sale.service';
import { ProductService } from '../../services/product.service';
import { TextLayoutComponent } from '../products/text.layout.component';
import { StaticSetOfOptionsLayoutComponent } from '../products/static-options.layout.component';
import { YesNoLayoutComponent } from '../products/yes-no.layout.component';
import { IntegerLayoutComponent } from '../products/integer.layout.component';
import { DatesLayoutComponent } from '../products/dates.layout.component';
import { DateLayoutComponent } from '../products/date.layout.component';
import { NumberLayoutComponent } from '../products/number.layout.component';
import { MoneyLayoutComponent } from '../products/money.layout.component';
import { PercentageLayoutComponent } from '../products/percentage.layout.component';
import { MultilineTextLayoutComponent } from '../products/multiline-text.layout.component';
import { TextNumberLayoutComponent } from '../products/text-number.layout.component';
import { LabelLayoutComponent } from '../products/label.layout.component';
import { LayoutDynamicSetOfOptionsControlComponent } from '../products/layout-control-dynamic-options.component';
import { JsonSchemaFormComponent } from '@ajsf/core';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private saleService: SaleService,
    private productService: ProductService,
    private router: Router) { }
  html = '';
  test = '<p>aaaa</p>';
  productId = '';
  options:any = {
    addSubmit: false,
  };
  model: any = {};
  schema: any = {};
  layout: any = {};
  Period: any = {
    startDate: moment().toISOString(),
    endDate: moment().add(1, 'day').add(1, 'year').toISOString()
  };
  @ViewChild('jsonForm', {read: JsonSchemaFormComponent, static: true}) jsonForm: JsonSchemaFormComponent;
  id: any = '';
  quote: any = null;
  attribute: any = {};
  productWidgets = {
    TextQuestion: TextLayoutComponent,
    StaticSetOfOptionsQuestion: StaticSetOfOptionsLayoutComponent,
    YesNoQuestion: YesNoLayoutComponent,
    FreeTextLookupQuestion: IntegerLayoutComponent,
    StartEndQuestion: DatesLayoutComponent,
    DateQuestion: DateLayoutComponent,
    DOBQuestion: DateLayoutComponent,
    YearQuestion: IntegerLayoutComponent,
    NumberQuestion: IntegerLayoutComponent,
    DecimalQuestion: NumberLayoutComponent,
    MoneyQuestion: MoneyLayoutComponent,
    PercentageQuestion: PercentageLayoutComponent,
    MultilineTextQuestion: MultilineTextLayoutComponent,
    TextNumberQuestion: TextNumberLayoutComponent,
    Label: LabelLayoutComponent,
    LookupChoiceQuestion: LayoutDynamicSetOfOptionsControlComponent,
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == null || this.id == 'PA') {
      this.productId = 'product-ec7b818d-2b27-08d9-6f58-3d38e85eb6cb';
    } else if (this.id == 'CTPL') {
      this.productId = 'product-1731d8ec-2b30-08d9-9140-094e89f102c5';
    }
    this.getProductDetail();
  }
  onDateChange(value: { value: any; }, att: string | number) {
    this.Period[att] = value.value;
  }
  onChange(obj: any) {
    this.model[obj.att] = obj.value;
  }
  onSubmit = async () => {
    // console.log(this.model);
    // console.log(this.jsonForm.value);
    
    let data = this.jsonForm.value;
    const period = { start: this.Period.startDate, end: this.Period.endDate };
    let newQuote = this.quote;
    if (!this.quote) {
      newQuote = await this.saleService.createQuote({
        data: {
          type: 'createQuoteRequests',
          attributes: this.attribute
        }
      });
      this.quote = newQuote;
    }
    newQuote = await this.saleService.updateQuote({
      data: {
        type: 'updateQuoteRequests',
        attributes: {
          quoteId: newQuote.data.id,
          changedAnswers: data,
          quotedPeriodChange: period
        }
      }
    });
    if (newQuote.data.attributes?.validationErrors?.length > 0) {
      let message = ''
      newQuote.data.attributes.validationErrors.forEach((error: any) => {
        message += error.propertyName + ': ' + error.message + '\n'
        // setError(error.propertyName, {
        //   type: "manual",
        //   message: error.message,
        // });    
      })
      alert(message);
      return;
    }
    await this.saleService.calculateQuote({
      data: {
        attributes: {
          productCommission: 0,
          quoteId: newQuote.data.id,
          salesCommission: 0,
          salesDiscount: 0,
          underwritingAdjustment: 0,
          underwritingAdjustmentReason: ''
        },
        type: 'calculatePriceRequests'
      }
    });

    let priceQuote = await this.waitForCalculate(6, 1000, newQuote.data.id);
    this.quote = priceQuote;
    this.router.navigate(["/review"], {queryParams: { id:this.quote.data.id}})
    // navigation.navigate('Persnal_Detail_Page', {
    //   quoteId: newQuote.data.id,
    //   quoteVersion: priceQuote.data.attributes.version,
    //   iconId: route.params.iconId,
    //   productName: route.params.productName,
    //   price: priceQuote.data.attributes.annualPremium.total.formattedAmount,
    //   allowGenerate: priceQuote.data.attributes.actions.GenerateDocument.isAllowed
    // });
  };
  wait = (time: any) => new Promise((res) => {
    setTimeout(() => res(true), time);
  });
  waitForCalculate = (dueTime: any, waitTime: any, id: any) => new Promise(async (res) => {
    for (let i = 0; i < dueTime; i++) {
      await this.wait(waitTime);
      let priceQuote = await this.saleService.getQuote(id);
      if (priceQuote.data.attributes.premium.isBeingCalculated === false) {
        res(priceQuote)
      }
    }
  })
  getProductDetail = async () => {
    let productDetail = await this.productService.getProductDetail(this.productId);
    let versionId = productDetail.data.relationships.activeVersion.data.id;
    this.model = {
      sourcePolicyId: null,
      productVersionId: versionId,
      period: {
        start: moment().toISOString(),
        end: moment().add(1, 'year').add(-1, 'day').toISOString()
      },
      currencyCode: 'SGD',
      answers: {},
    };
    this.attribute = {
      salesChannel: productDetail.data.relationships.salesChannel.data[0].id,
      salesChannelName: "SalesLab",
      productVersionId: versionId,
      productName: productDetail.data.attributes.name,
      productId: this.productId  
    }
    let productVersions = await this.productService.getProductVersionDetail(versionId);
    let jsonSchema = JSON.parse(productVersions.data.attributes.salesProcessDefinition.steps[1].schema);
    this.schema = jsonSchema.properties;
    this.layout = JSON.parse(productVersions.data.attributes
      .salesProcessDefinition.steps[1].layout);
  }

}
