import { Component, OnInit } from '@angular/core';
import { UtilsService, NavigationItem } from '@app/services/utils.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

/**
 * Header navigation component
 */
@Component({
  selector: 'ofd-agregator-header-navigation-items',
  templateUrl: './header-navigation-items.component.html',
  styleUrls: ['./header-navigation-items.component.scss']
})
export class HeaderNavigationItemsComponent implements OnInit {
  /**
   * Navgiation components
   */
  public get items(): NavigationItem[] {
    return this.utilService.menuStructure || [];
  }

  /**
   * @ignore
   */
  public sub: Subscription;

  /**
   * Creates an instance of HeaderNavigationItemsComponent.
   * @param {UtilsService} utilService Utils service
   * @param {LanguageService} languageService Language service
   */
  constructor(public utilService: UtilsService, public languageService: LanguageService) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.sub = this.languageService.changeLanguage.subscribe(_ => {
      this.utilService.buildStructure();
    });

    this.utilService.getStructure();
  }
}
