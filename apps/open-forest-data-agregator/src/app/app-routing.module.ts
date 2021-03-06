import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from '@app/layout/main-layout/main-layout.component';
import { NotFoundComponent } from '@app/pages/not-found/not-fount.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: '../app/pages/home/home.module#HomeModule' },
      { path: 'more', loadChildren: '../app/pages/generic-pages/generic.module#GenericModule' },
      { path: 'statistics', loadChildren: '../app/pages/statistics/statistics.module#StatisticsModule' },
      { path: 'blog', loadChildren: '../app/pages/blog/blog.module#BlogModule' },
      { path: 'news', loadChildren: '../app/pages/news/news.module#NewsModule' },
      { path: 'datasets', loadChildren: '../app/pages/datasets/datasets.module#DatasetsModule' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];
/**
 * Routing module for app. Contains routing path for basic modules
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
