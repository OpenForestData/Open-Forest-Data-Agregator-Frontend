import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetComponent } from './dataset.component';
import { DatasetRoutingModule } from './dataset-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [DatasetComponent],
  imports: [CommonModule, DatasetRoutingModule, SharedModule]
})
export class DatasetModule {}
