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
      { path: 'datasets', loadChildren: '../app/pages/datasets/datasets.module#DatasetsModule' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
