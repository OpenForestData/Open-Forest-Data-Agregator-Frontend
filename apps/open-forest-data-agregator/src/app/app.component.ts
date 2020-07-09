import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { LanguageService } from './services/language.service';
import { HttpClient } from '@angular/common/http';

/**
 * Entry component for app
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
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2,
    public router: Router
  ) {
    this.languageService.language = this.languageService.language;
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(document.documentElement, 'lang', this.languageService.language);
    }

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
}
