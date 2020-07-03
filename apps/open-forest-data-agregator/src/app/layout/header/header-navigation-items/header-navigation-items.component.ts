import { Component, OnInit } from '@angular/core';

interface NavigationItem {
  name: string;
  path: string;
  key: string;
  children?: NavigationItem[];
}
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
export class HeaderNavigationItemsComponent {
  /**
   * Navgiation components
   *
   * @type {NavigationItem[]}
   * @memberof HeaderNavigationItemsComponent
   */
  public items: NavigationItem[] = [
    {
      name: '',
      path: '/',
      key: 'start'
    },
    {
      name: '',
      path: '/datasets',
      key: 'datasets'
    },
    {
      name: '',
      path: '/statistics',
      key: 'stats'
    },
    {
      name: '',
      path: '/mobile-application',
      key: 'mobile-application'
    },
    {
      name: '',
      path: '/more/about-project',
      key: 'more',
      children: [
        { name: '', path: '/more/about-project', key: 'about-project' },
        { name: '', path: '/more/partners', key: 'about-partners' },
        {
          name: '',
          path: '/more/about-resources',
          key: 'about-datasets'
        },
        {
          name: '',
          path: '/more/instructions',
          key: 'instructions'
        }
      ]
    },
    {
      name: '',
      path: '/blog',
      key: 'blog'
    }
  ];
}
