import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetComponent } from './dataset.component';
import { DatasetRoutingModule } from './dataset-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Dataset details module
 *
 * @export
 * @class DatasetModule
 */
@NgModule({
  declarations: [DatasetComponent],
  imports: [CommonModule, DatasetRoutingModule, SharedModule, MarkdownModule.forRoot()]
})
export class DatasetModule {}
