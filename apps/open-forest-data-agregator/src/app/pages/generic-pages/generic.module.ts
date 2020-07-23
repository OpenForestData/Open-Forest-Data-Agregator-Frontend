import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { GenericRoutingModule } from './generic-routing.module';
import { AboutProjectComponent } from './about-project/about-project.component';
import { AboutResourcesComponent } from './about-resources/about-resources.component';
import { FaqComponent } from './faq/faq.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PartnersComponent } from './partners/partners.component';

const components = [
  AboutProjectComponent,
  AboutResourcesComponent,
  FaqComponent,
  InstructionsComponent,
  PartnersComponent
];
/**
 * Generic pages module
 *
 * @export
 * @class GenericModule
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, GenericRoutingModule, SharedModule]
})
export class GenericModule {}
