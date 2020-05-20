import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasetComponent } from './dataset.component';

const routes: Routes = [{ path: '', component: DatasetComponent }];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class DatasetRoutingModule {}
