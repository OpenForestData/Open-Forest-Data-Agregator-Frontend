import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

interface NavigationItem {
  name: string;
  path: string;
  key: string;
  children?: NavigationItem[];
}

@Component({
  selector: 'ofd-agregator-header-navigation-items',
  templateUrl: './header-navigation-items.component.html',
  styleUrls: ['./header-navigation-items.component.scss']
})
export class HeaderNavigationItemsComponent implements OnInit {
  public items: NavigationItem[] = [
    {
      name: '',
      path: '/',
      key: 'start'
    },
    {
      name: '',
      path: 'datasets',
      key: 'datasets'
    },
    {
      name: '',
      path: 'stats',
      key: 'stats'
    },
    {
      name: '',
      path: 'mobile-application',
      key: 'mobile-application'
    },
    {
      name: '',
      path: '',
      key: 'more',
      children: [
        { name: '', path: 'about-project', key: 'about-project' },
        { name: '', path: 'about-partners', key: 'about-partners' },
        {
          name: '',
          path: 'about-datasets',
          key: 'about-datasets'
        },
        {
          name: '',
          path: 'instructions',
          key: 'instructions'
        }
      ]
    },
    {
      name: '',
      path: 'blog',
      key: 'blog'
    }
  ];

  constructor(public translateService: TranslateService) {
    this.translateService
      .get('nav.items')
      .subscribe(translations => this.setTranslationsToItems(this.items, translations));
  }

  ngOnInit(): void {}

  setTranslationsToItems(items: NavigationItem[], translations) {
    items.forEach(item => {
      if (translations[item['key']]) item.name = translations[item['key']];

      if (item.children && item.children.length > 0) this.setTranslationsToItems(item.children, translations);
    });
  }
}
