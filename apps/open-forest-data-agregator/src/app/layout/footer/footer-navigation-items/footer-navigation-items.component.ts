import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

interface NavigationItem {
  name: string;
  path: string;
}
/**
 * Footer navigation
 *
 * @export
 * @class FooterNavigationItemsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-footer-navigation-items',
  templateUrl: './footer-navigation-items.component.html',
  styleUrls: ['./footer-navigation-items.component.scss']
})
export class FooterNavigationItemsComponent {
  /**
   * Navigation items
   *
   * @type {NavigationItem[]}
   * @memberof FooterNavigationItemsComponent
   */
  public items: NavigationItem[] = [
    { name: 'footer.items.datasets', path: '/more/about-resources' },
    { name: 'footer.items.about-page', path: '/more/about-project' },
    { name: 'footer.items.policy', path: '/more/privacy-policy' },
    { name: 'footer.items.api', path: 'api-docs' },
    { name: 'footer.items.faq', path: '/more/faq' }
  ];
}
