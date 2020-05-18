import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { LanguageService } from './services/language.service';
import { HttpClient } from '@angular/common/http';

/**
 * App component
 */
@Component({
  selector: 'ofd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Set language on application init and change window scroll to 0 when route was changed
   * @param {Renderer2} renderer Renderer2
   * @param {TranslateService} translate Translate service
   * @param {LanguageService} languageService Language service
   * @param {string} platformId Platform ID
   * @param {Router} router Router
   */
  constructor(
    private renderer: Renderer2,
    private translate: TranslateService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: string,
    public router: Router
  ) {
    this.useLanguage(this.languageService.language);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          window.scrollTo(0, 0);
        }
      }
    });
  }

  /**
   * @ignore
   */
  ngOnInit() {}

  /**
   * Change language and reload page
   * @param {string} language Language
   */
  useLanguage(language: string): void {
    this.translate.setDefaultLang(language);
    this.translate.use(language);

    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(document.documentElement, 'lang', language);
    }
  }
}
