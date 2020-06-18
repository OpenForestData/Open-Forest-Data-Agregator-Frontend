import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceComponent } from './resource.component';

const routes: Routes = [{ path: ':id', component: ResourceComponent }];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ResourceRoutingModule {}
