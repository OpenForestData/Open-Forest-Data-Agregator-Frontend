import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  public activeTags = new Set();
  public collapseYear = true;
  public mobileFilters = false;

  public filters = {
    filters: {
      key: 'filters',
      iconSrc: '/assets/images/filters.svg',
      name: 'Filtry',
      expandable: true,
      isExpanded: true
    },
    tags: {
      key: 'tags',
      iconSrc: '/assets/modules/news/tags.svg',
      name: 'Tagi',
      expandable: true,
      isExpanded: true
    }
  };

  public yearFilter = [
    { name: '2020', value: 2020, checked: false },
    { name: '2019', value: 2019, checked: false },
    { name: '2018', value: 2018, checked: false },
    { name: '2017', value: 2017, checked: false },
    { name: '2016', value: 2016, checked: false }
  ];

  public page = 1;

  public languageSubscription: Subscription = new Subscription();
  constructor(public languageService: LanguageService) {}
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }
  getData() {}
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  clearYear() {
    this.yearFilter = this.yearFilter.map(item => ({ ...item, checked: false }));
  }

  toggleFilter(payload, name) {
    this.filters[name].isExpanded = payload;
  }

  toogleTag(tag: string) {
    if (this.activeTags.has(tag)) this.activeTags.delete(tag);
    else this.activeTags.add(tag);
  }

  hasTag(tag) {
    return this.activeTags.has(tag);
  }
}
