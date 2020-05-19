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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularSvgIconModule,
    TranslateModule,
    NgxPaginationModule,
    UICheckboxModule
  ],
  declarations: [PageNavComponent, PaginationComponent, HeaderBarComponent],
  exports: [
    CommonModule,
    TranslateModule,
    AngularSvgIconModule,
    FormsModule,
    PageNavComponent,
    PaginationComponent,
    HeaderBarComponent,
    UICheckboxModule
  ]
})
export class SharedModule {}
