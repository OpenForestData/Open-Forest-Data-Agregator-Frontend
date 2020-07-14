import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { NewsService } from '@app/services/news.service';
/**
 * News page component
 *
 * @export
 * @class NewsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  /**
   * tags and keywords
   *
   * @memberof NewsComponent
   */
  public activeTags = new Set();
  /**
   * Hide year filter
   *
   * @memberof NewsComponent
   */
  public collapseYear = true;

  /**
   * If mobile filter are visible
   *
   * @memberof NewsComponent
   */
  public mobileFilters = false;

  /**
   * Settings for filters headers
   *
   * @memberof NewsComponent
   */
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

  /**
   * Year filter values
   *
   * @memberof NewsComponent
   */
  public yearFilter = [
    { name: '2020', value: 2020, checked: false },
    { name: '2019', value: 2019, checked: false },
    { name: '2018', value: 2018, checked: false },
    { name: '2017', value: 2017, checked: false },
    { name: '2016', value: 2016, checked: false }
  ];

  /**
   * Pagination page
   *
   * @memberof NewsComponent
   */
  public page = 1;

  pageSize = 15;

  /**
   * Chnage language subscription
   *
   * @type {Subscription}
   * @memberof NewsComponent
   */
  public languageSubscription: Subscription = new Subscription();

  news: any = [];

  /**
   * @ignore
   * @param {LanguageService} languageService
   * @memberof NewsComponent
   */
  constructor(public languageService: LanguageService, private newsService: NewsService) {}

  /**
   * @ignore
   *
   * @memberof NewsComponent
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
    this.getData({ page: 1, limit: 15 });
  }

  /**
   * Fetch data from API
   *
   * @memberof NewsComponent
   */
  getData(filters: any = this.filters) {
    this.newsService.getNews(filters).subscribe(response => {
      this.news = response;
    });
  }

  /**
   * @ignore
   *
   * @memberof NewsComponent
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  /**
   * Clear year filter
   *
   * @memberof NewsComponent
   */
  clearYear() {
    this.yearFilter = this.yearFilter.map(item => ({ ...item, checked: false }));
  }

  /**
   * Toggle filter
   *
   * @param {*} payload
   * @param {*} name
   * @memberof NewsComponent
   */
  toggleFilter(payload, name) {
    this.filters[name].isExpanded = payload;
  }

  /**
   * Adds or removes tag
   *
   * @param {string} tag
   * @memberof NewsComponent
   */
  toogleTag(tag: string) {
    if (this.activeTags.has(tag)) this.activeTags.delete(tag);
    else this.activeTags.add(tag);
  }

  /**
   * Check whatever tag is in Set
   *
   * @param {*} tag
   * @returns
   * @memberof NewsComponent
   */
  hasTag(tag) {
    return this.activeTags.has(tag);
  }

  paginationChanged(payload) {
    this.page = payload.page;
    this.pageSize = payload.limit;
    this.newsService.getNews({ page: payload.page, limit: payload.limit }).subscribe(response => {
      this.news = response;
    });
  }
}
