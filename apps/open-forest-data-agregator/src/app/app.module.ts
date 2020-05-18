import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgProgressModule } from '@ngx-progressbar/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CookieService } from 'ngx-cookie-service';

import { APIInterceptor } from '@app/interceptors/api.interceptor';
import { AppConfigService } from './services/app-config.service';

import { AppComponent } from '@app/app.component';
import { MainLayoutComponent } from '@app/layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from '@app/layout/admin-layout/admin-layout.component';
import { NotFoundComponent } from '@app/pages/not-found/not-fount.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';

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

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    AdminLayoutComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ofdApp' }),
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularSvgIconModule,
    NgProgressModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AppConfigService,
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
