import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { PaymentComponent } from '../components/payment/payment.component';
import { HomeComponent } from '../components/home/home.component';
import { QuestionComponent } from '../components/question/question.component';
import { ReviewComponent } from '../components/review/review.component';
import { SummaryComponent } from 'src/components/summary/summary.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'review', component: ReviewComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
