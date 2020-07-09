import { Component, OnInit } from '@angular/core';
import { UtilsService, NavigationItem } from '@app/services/utils.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

/**
 * Header navigation component
 *
 * @export
 * @class HeaderNavigationItemsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-header-navigation-items',
  templateUrl: './header-navigation-items.component.html',
  styleUrls: ['./header-navigation-items.component.scss']
})
export class HeaderNavigationItemsComponent implements OnInit {
  /**
   * Navgiation components
   *
   * @type {NavigationItem[]}
   * @memberof HeaderNavigationItemsComponent
   */
  public get items(): NavigationItem[] {
    return this.utilService.menuStructure || [];
  }

  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof HeaderNavigationItemsComponent
   */
  public sub: Subscription;

  /**
   * Creates an instance of HeaderNavigationItemsComponent.
   * @memberof HeaderNavigationItemsComponent
   */
  constructor(public utilService: UtilsService, public languageService: LanguageService) {}

  /**
   * @ignore
   *
   * @memberof HeaderNavigationItemsComponent
   */
  ngOnInit() {
    this.sub = this.languageService.changeLanguage.subscribe(_ => {
      this.utilService.buildStructure();
    });

    this.utilService.getStructure();
  }
}
