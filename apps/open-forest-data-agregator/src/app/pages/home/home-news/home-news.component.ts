import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { NewsService } from '@app/services/news.service';
/**
 * Desktop view of news at home page
 *
 * @export
 * @class HomeNewsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss', '../home.media.scss']
})
export class HomeNewsComponent implements OnInit, OnDestroy {
  /**
   * Language change subscription
   *
   * @type {Subscription}
   * @memberof HomeNewsComponent
   */
  public languageSubscription: Subscription = new Subscription();
  /**
   * News
   */
  news = [];
  /**
   * Filters list
   */
  filters = {};

  /**
   *
   * @param {LanguageService} languageService
   * @memberof HomeNewsComponent
   */
  constructor(public languageService: LanguageService, public newsService: NewsService) {}

  /**
   * @ignore
   *
   * @memberof HomeNewsComponent
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
    this.getData({ page: 1, limit: 2 });
  }

  /**
   * Fetch data from API
   *
   * @memberof HomeNewsComponent
   */
  getData(filters: any = this.filters) {
    this.newsService.getNews(filters).subscribe(response => {
      this.news = response.articles;
    });
  }

  /**
   * Create link for redirect to chosen news
   * @param slug Slug
   */
  redirectToNews(slug: string) {
    return window.location + 'news/' + slug;
  }

  /**
   * @ignore
   *
   * @memberof HomeNewsComponent
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
