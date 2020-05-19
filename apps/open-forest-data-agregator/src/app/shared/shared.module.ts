import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxPaginationModule } from 'ngx-pagination';

import { PageNavComponent } from '@app/layout/page-nav/page-nav.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularSvgIconModule,
    TranslateModule,
    NgxPaginationModule
  ],
  declarations: [PageNavComponent, PaginationComponent, SocialComponent],
  exports: [
    CommonModule,
    TranslateModule,
    AngularSvgIconModule,
    FormsModule,
    PageNavComponent,
    PaginationComponent,
    SocialComponent
  ]
})
export class SharedModule {}
