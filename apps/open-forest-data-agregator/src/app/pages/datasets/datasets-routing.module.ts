import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetsComponent } from './datasets.component';

const routes: Routes = [
  { path: '', component: DatasetsComponent, pathMatch: 'full' },
  { path: 'resource', loadChildren: './resource/resource.module#ResourceModule' },
  { path: 'detail', loadChildren: './dataset/dataset.module#DatasetModule' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class DatasetsRoutingModule {}
