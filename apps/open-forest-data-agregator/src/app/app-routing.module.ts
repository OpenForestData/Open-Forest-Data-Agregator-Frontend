import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
      { path: 'auth', loadChildren: '../app/auth/auth.module#AuthModule' },
      { path: 'datasets', loadChildren: '../app/pages/datasets/datasets.module#DatasetsModule' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
