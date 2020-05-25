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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularSvgIconModule,
    TranslateModule,
    NgxPaginationModule,
    UICheckboxModule,
    UISelectModule
  ],
  declarations: [
    PageNavComponent,
    PaginationComponent,
    SectionTitleComponent,
    UIModalComponent,
    HeaderBarComponent,
    SocialComponent
  ],
  exports: [
    CommonModule,
    TranslateModule,
    AngularSvgIconModule,
    FormsModule,
    PageNavComponent,
    PaginationComponent,
    HeaderBarComponent,
    UICheckboxModule,
    UISelectModule,
    SectionTitleComponent,
    UIModalComponent,
    SocialComponent
  ]
})
export class SharedModule {}
