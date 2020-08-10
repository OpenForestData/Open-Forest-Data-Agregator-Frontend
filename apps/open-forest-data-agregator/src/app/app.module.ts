import { CommonModule } from '@angular/common';
import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgProgressModule } from '@ngx-progressbar/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { StateModule } from '@app/store/state.module';

import { APIInterceptor } from '@app/interceptors/api.interceptor';

import { AppConfigService } from './services/app-config.service';

import { AppComponent } from '@app/app.component';
import { MainLayoutComponent } from '@app/layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from '@app/layout/admin-layout/admin-layout.component';
import { NotFoundComponent } from '@app/pages/not-found/not-fount.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { HeaderControlsComponent } from '@app/layout/header/header-controls/header-controls.component';
import { HeaderActionsComponent } from '@app/layout/header/header-actions/header-actions.component';
import { HeaderNavigationItemsComponent } from '@app/layout/header/header-navigation-items/header-navigation-items.component';
import { FooterNavigationItemsComponent } from '@app/layout/footer/footer-navigation-items/footer-navigation-items.component';
import { FooterLogoComponent } from '@app/layout/footer/footer-logo/footer-logo.component';
import { SharedModule } from './shared/shared.module';
import { HammerConfig } from 'src/config/hammer.config';
import { BackToTopComponent } from '@app/layout/back-to-top/back-to-top.component';
import { LoaderComponent } from './layout/main-layout/loader/loader.component';

/**
 * Initialize translate loader
 * @param {HttpClient} http Http client
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/**
 * Load configuration on initialize application
 * @param {AppConfigService} appConfigService Application config service
 */
export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

/**
 * App module components
 */
const components = [
  AppComponent,
  MainLayoutComponent,
  HeaderComponent,
  HeaderControlsComponent,
  HeaderActionsComponent,
  HeaderNavigationItemsComponent,
  FooterComponent,
  FooterNavigationItemsComponent,
  FooterLogoComponent,
  AdminLayoutComponent,
  NotFoundComponent,
  BackToTopComponent,
  LoaderComponent
];
/**
 * Application main module. Loads initial modules for app to work
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ofdApp' }),
    HttpClientModule,
    AppRoutingModule,
    StateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularSvgIconModule,
    NgProgressModule,
    SharedModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AppConfigService,
    {
      provide: HammerGestureConfig,
      useClass: HammerConfig
    },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfigService, HttpClientModule], multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
