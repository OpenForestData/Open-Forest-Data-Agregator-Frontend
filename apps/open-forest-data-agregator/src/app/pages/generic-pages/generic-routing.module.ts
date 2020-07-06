import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutProjectComponent } from './about-project/about-project.component';
import { AboutResourcesComponent } from './about-resources/about-resources.component';
import { FaqComponent } from './faq/faq.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PartnersComponent } from './partners/partners.component';
import { PageTemplateComponent } from '@app/shared/page-template/page-template.component';

const routes: Routes = [
  { path: 'about-project', component: AboutProjectComponent },
  { path: 'about-resources', component: AboutResourcesComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'partners', component: PartnersComponent },
  { path: ':slug', component: PageTemplateComponent }
];
/**
 * Routing for generic pages
 *
 * @export
 * @class GenericRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class GenericRoutingModule {}
