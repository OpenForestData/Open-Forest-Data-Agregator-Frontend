import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceRoutingModule } from './resource-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ResourceComponent } from './resource.component';

@NgModule({
  declarations: [ResourceComponent],
  imports: [CommonModule, ResourceRoutingModule, SharedModule]
})
export class ResourceModule {}
