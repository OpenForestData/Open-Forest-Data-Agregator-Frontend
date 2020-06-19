import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { AppConfigService } from './app-config.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

/**
 * Language service
 */
@Injectable()
export class LanguageService {
  public changeLanguage: Subject<any> = new Subject();
  /**
   * Application language
   */
  public get language() {
    return this.cookieService.get('language') || (AppConfigService.config ? AppConfigService.config.language : 'pl');
  }

  public set language(value) {
    if (AppConfigService.config) {
      AppConfigService.config.language = value;
    }

    this.cookieService.set('language', value);
    this.translate.setDefaultLang(value);
    this.translate.use(value);

    this.changeLanguage.next();
  }

  /**
   * Available languages
   *
   * @memberof LanguageService
   */
  public get languages() {
    return AppConfigService.config ? AppConfigService.config.languages : [];
  }

  /**
   * Set language from cookie or from config
   * @param {CookieService} cookieService Cookie service
   */
  constructor(
    public cookieService: CookieService,
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}
}
