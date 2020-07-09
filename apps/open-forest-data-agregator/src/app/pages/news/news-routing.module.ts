import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsPostComponent } from './news-post/news-post.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: ':id/:slug', component: NewsPostComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class NewsRoutingModule {}
