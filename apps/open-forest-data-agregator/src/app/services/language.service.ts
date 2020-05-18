import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { AppConfigService } from './app-config.service';

/**
 * Language service
 */
@Injectable()
export class LanguageService {
  /**
   * Application language
   */
  public language: string = AppConfigService.config ? AppConfigService.config.language : 'pl';

  /**
   * Set language from cookie or from config
   * @param {CookieService} cookieService Cookie service
   */
  constructor(public cookieService: CookieService) {
    this.language = this.cookieService.get('language') || this.language;
  }
}
