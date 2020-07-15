import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: ':slug', component: BlogPostComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class BlogRoutingModule {}
