import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { HomeMobileAppComponent } from './home-mobile-app/home-mobile-app.component';
import { HomeYoutubeComponent } from './home-youtube/home-youtube.component';
import { HomeFaqContactComponent } from './home-faq-contact/home-faq-contact.component';
import { HomeContactFormComponent } from './home-contact-form/home-contact-form.component';
import { HomeNewsMobileComponent } from './home-news-mobile/home-news-mobile.component';

const components = [
  HomeComponent,
  HomeBannerComponent,
  HomeNewsComponent,
  HomeSearchComponent,
  HomeMobileAppComponent,
  HomeYoutubeComponent,
  HomeFaqContactComponent,
  HomeContactFormComponent,
  HomeNewsMobileComponent
];
/**
 * Home module
 *
 * @export
 * @class HomeModule
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, HomeRoutingModule, SharedModule]
})
export class HomeModule {}
