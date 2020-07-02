import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasetComponent } from './dataset.component';
import { ResourceComponent } from '../resource/resource.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetComponent,
    children: [{ path: ':id', component: ResourceComponent }]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class DatasetRoutingModule {}

// npm run compodoc && live - server documentation /
