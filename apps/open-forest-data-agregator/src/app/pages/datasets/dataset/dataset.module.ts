import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetComponent } from './dataset.component';
import { DatasetRoutingModule } from './dataset-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { DataContainerComponent } from './data-container/data-container.component';

@NgModule({
  declarations: [DatasetComponent, DataContainerComponent],
  imports: [CommonModule, DatasetRoutingModule, SharedModule],
  exports: [DataContainerComponent]
})
export class DatasetModule {}
