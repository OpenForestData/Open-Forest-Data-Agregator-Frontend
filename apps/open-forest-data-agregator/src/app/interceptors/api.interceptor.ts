import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

import { AppConfigService } from '@app/services/app-config.service';
import { LanguageService } from '@app/services/language.service';

/**
 * API Interceptor
 */
@Injectable({
  providedIn: 'root'
})
export class APIInterceptor implements HttpInterceptor {
  /**
   * Application Configuration
   */
  public config = AppConfigService.config;

  /**
   * Dependency Injection
   * @param {LanguageService} language Language Service
   * @param {CookieService} cookieService Cookie Service
   * @param {HttpClient} http Http Client
   * @param {platformId} platformId Platform ID
   */
  constructor(
    public language: LanguageService,
    public cookieService: CookieService,
    public http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  /**
   * Intercept request and add header if user cookie is set, or send refresh token
   * @param {HttpRequest<any>} request Request
   * @param {HttpHandler} next Next action
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      request = this.addTokenAndLanguage(request, this.getAccessToken());
    }
    return next.handle(request);
  }

  /**
   * Add token to request
   * @param {HttpRequest<any>} request HTTP Request
   * @param {string | boolean} token Access Token
   * @returns {HttpRequest<any>} Modified request with Authorization header
   */
  private addTokenAndLanguage(request: HttpRequest<any>, token: string | boolean): HttpRequest<any> {
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `JWT ${token}`)
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept-Language', this.language.language)
    });

    return request;
  }

  /**
   * Set access token
   * @param {string} token
   */
  setAccessToken(token: string): void {
    this.cookieService.set(environment.tokenCookie, token, environment.userCookieTime, '/');
  }

  /**
   * Get access token
   * @returns {any} token
   */
  getAccessToken(): any {
    return this.cookieService.get(environment.tokenCookie) || false;
  }
}
