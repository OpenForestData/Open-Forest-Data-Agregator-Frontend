import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

interface NavigationItem {
  name: string;
  path: string;
  key: string;
}

@Component({
  selector: 'ofd-agregator-footer-navigation-items',
  templateUrl: './footer-navigation-items.component.html',
  styleUrls: ['./footer-navigation-items.component.scss']
})
export class FooterNavigationItemsComponent implements OnInit {
  public items: NavigationItem[] = [
    { name: '', path: '/more/about-resources', key: 'datasets' },
    { name: '', path: 'about-page', key: 'about-page' },
    { name: '', path: 'privacy-policy', key: 'policy' },
    { name: '', path: 'api-docs', key: 'api' },
    { name: '', path: '/more/faq', key: 'faq' }
  ];

  constructor(public translateService: TranslateService) {
    this.translateService.get('footer.items').subscribe(translations => {
      this.items.forEach(item => {
        if (translations[item['key']]) item.name = translations[item['key']];
      });
    });
  }

  ngOnInit(): void {}
}
