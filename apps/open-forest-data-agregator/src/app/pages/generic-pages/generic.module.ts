import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { GenericRoutingModule } from './generic-routing.module';
import { AboutProjectComponent } from './about-project/about-project.component';
import { AboutResourcesComponent } from './about-resources/about-resources.component';
import { FaqComponent } from './faq/faq.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PartnersComponent } from './partners/partners.component';
import { NewDataMobileComponent } from '../home/new-data-mobile/new-data-mobile.component';
import { NewDataComponent } from '../home/new-data/new-data.component';

const components = [
  AboutProjectComponent,
  AboutResourcesComponent,
  FaqComponent,
  InstructionsComponent,
  PartnersComponent
];

@NgModule({
  declarations: components,
  imports: [CommonModule, GenericRoutingModule, SharedModule]
})
export class GenericModule {}
