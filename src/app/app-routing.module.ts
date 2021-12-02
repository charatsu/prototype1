import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from 'src/app/catalog/catalog.component';
import { HomeComponent } from '../components/home/home.component';
import { QuestionComponent } from '../components/question/question.component';
import { ReviewComponent } from '../components/review/review.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'review', component: ReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
