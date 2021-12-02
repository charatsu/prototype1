import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Bootstrap4FrameworkModule } from '@ajsf/bootstrap4';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from '../components/home/home.component';
import { QuestionComponent } from '../components/question/question.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PAComponent } from '../components/pa/pa.component';
import { CTPLComponent } from '../components/ctpl/ctpl.component';
import { ReviewComponent } from '../components/review/review.component';
import { DateLayoutComponent } from 'src/components/products/date.layout.component';
import { DatesLayoutComponent } from 'src/components/products/dates.layout.component';
import { IntegerLayoutComponent } from 'src/components/products/integer.layout.component';
import { LabelLayoutComponent } from 'src/components/products/label.layout.component';
import { MoneyLayoutComponent } from 'src/components/products/money.layout.component';
import { MultilineTextLayoutComponent } from 'src/components/products/multiline-text.layout.component';
import { NumberLayoutComponent } from 'src/components/products/number.layout.component';
import { PercentageLayoutComponent } from 'src/components/products/percentage.layout.component';
import { StaticSetOfOptionsLayoutComponent } from 'src/components/products/static-options.layout.component';
import { TextLayoutComponent } from 'src/components/products/text.layout.component';
import { TextNumberLayoutComponent } from 'src/components/products/text-number.layout.component';
import { YesNoLayoutComponent } from 'src/components/products/yes-no.layout.component';
import { LayoutDynamicSetOfOptionsControlComponent } from 'src/components/products/layout-control-dynamic-options.component';
import { ProductLookupValidationService } from 'src/services/product-lookup-validation.service';
import { LOOKUP_VALIDATION_SERVICE_TOKEN } from 'src/components/products/interfaces/token-define';
import { HttpClientModule } from '@angular/common/http';
import { JsonApiModule } from 'angular2-jsonapi';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionComponent,
    PAComponent,
    CTPLComponent,
    ReviewComponent,
    DateLayoutComponent,
    DatesLayoutComponent,
    IntegerLayoutComponent,
    LabelLayoutComponent,
    MoneyLayoutComponent,
    MultilineTextLayoutComponent,
    NumberLayoutComponent,
    PercentageLayoutComponent,
    StaticSetOfOptionsLayoutComponent,
    TextNumberLayoutComponent,
    TextLayoutComponent,
    YesNoLayoutComponent,
    LayoutDynamicSetOfOptionsControlComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserModule,
    BrowserAnimationsModule,
    Bootstrap4FrameworkModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    JsonApiModule,
    HttpClientModule
  ],
  providers: [
    ProductLookupValidationService,
    { provide: LOOKUP_VALIDATION_SERVICE_TOKEN, useClass: ProductLookupValidationService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
