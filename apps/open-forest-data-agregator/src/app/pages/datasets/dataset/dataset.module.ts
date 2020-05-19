import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetComponent } from './dataset.component';
import { DatasetRoutingModule } from './dataset-routing.module';

@NgModule({
  declarations: [DatasetComponent],
  imports: [CommonModule, DatasetRoutingModule]
})
export class DatasetModule {}
