import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxPaginationModule } from 'ngx-pagination';

import { UICheckboxModule } from '@libs/ui-checkbox/src/lib/ui-checkbox.module';

import { PageNavComponent } from '@app/layout/page-nav/page-nav.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HeaderBarComponent } from '@app/shared/header-bar/header-bar.component';
import { SocialComponent } from './social/social.component';
import { UISelectModule } from '@libs/ui-select/src/lib/ui-select.module';
import { SectionTitleComponent } from './section-title/section-title.component';
import { UIModalComponent } from './ui-modal/ui-modal.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { NewDataComponent } from '@app/pages/home/new-data/new-data.component';
import { NewDataMobileComponent } from '@app/pages/home/new-data-mobile/new-data-mobile.component';
import { AccordionComponent } from './accordion/accordion.component';
import { DataContainerComponent } from './data-container/data-container.component';
import { DebounceKeyupDirective } from '@app/directives/debonuce-keyup.directive';
import { NgSelectModule } from '@ng-select/ng-select';

/**
 * Shared components
 */
const components = [
  PageNavComponent,
  PaginationComponent,
  SectionTitleComponent,
  UIModalComponent,
  HeaderBarComponent,
  PageTemplateComponent,
  SocialComponent,
  NewDataMobileComponent,
  NewDataComponent,
  AccordionComponent,
  DataContainerComponent,
  DebounceKeyupDirective
];
/**
 * Shared module, contains common used components across whole application
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    AngularSvgIconModule,
    TranslateModule,
    NgxPaginationModule,
    UICheckboxModule,
    UISelectModule
  ],
  declarations: [...components],
  exports: [
    CommonModule,
    TranslateModule,
    AngularSvgIconModule,
    FormsModule,
    NgSelectModule,
    UICheckboxModule,
    UISelectModule,
    ...components
  ]
})
export class SharedModule {}
