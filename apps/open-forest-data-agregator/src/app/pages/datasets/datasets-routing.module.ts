import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetsComponent } from './datasets.component';

const routes: Routes = [
  { path: '', component: DatasetsComponent },
  { path: 'dataset', loadChildren: './dataset/dataset.module#DatasetModule' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class DatasetsRoutingModule {}
