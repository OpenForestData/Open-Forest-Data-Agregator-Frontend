import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { PartnersComponent } from './partners/partners.component';
import { PageTemplateComponent } from '@app/shared/page-template/page-template.component';
import { AccessibilityComponent } from '@app/pages/generic-pages/accessibility/accessibility.component';

const routes: Routes = [
  // { path: 'about-project', component: AboutProjectComponent },
  // { path: 'about-resources', component: AboutResourcesComponent },
  { path: 'faq', component: FaqComponent },
  // { path: 'instructions', component: InstructionsComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'accessibility', component: AccessibilityComponent },
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
