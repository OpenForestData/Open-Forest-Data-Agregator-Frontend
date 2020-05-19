import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { DatasetsRoutingModule } from './datasets-routing.module';

import { DatasetsComponent } from './datasets.component';
import { DatasetsHeaderComponent } from '@app/pages/datasets/datasets-header/datasets-header.component';

@NgModule({
  declarations: [DatasetsComponent, DatasetsHeaderComponent],
  imports: [CommonModule, DatasetsRoutingModule, SharedModule]
})
export class DatasetsModule {}
