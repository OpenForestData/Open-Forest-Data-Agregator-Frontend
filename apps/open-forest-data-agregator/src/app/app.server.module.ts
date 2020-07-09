import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from './interceptors/universal.interceptor';
/**
 * Server module for SSR
 *
 * @export
 * @class AppServerModule
 */
@NgModule({
  imports: [AppModule, ServerModule, ModuleMapLoaderModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
