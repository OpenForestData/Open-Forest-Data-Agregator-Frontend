import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { DatasetsRoutingModule } from './datasets-routing.module';

import { DatasetsComponent } from './datasets.component';

@NgModule({
  declarations: [
    DatasetsComponent
  ],
  imports: [CommonModule, DatasetsRoutingModule, SharedModule]
})
export class DatasetsModule {
}
