import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '@app/services/news.service';
/**
 * View of news post
 *
 * @export
 * @class NewsPostComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['../news.component.scss', './news-post.component.scss']
})
export class NewsPostComponent implements OnInit, OnDestroy {
  /**
   * Router subscription to get id from params
   *
   * @type {Subscription}
   * @memberof NewsPostComponent
   */
  public routerSubscription: Subscription = new Subscription();

  /**
   * Language Subscription
   *
   * @type {Subscription}
   * @memberof NewsPostComponent
   */
  public languageSubscription: Subscription = new Subscription();

  /**
   * News ID
   *
   * @memberof NewsPostComponent
   */
  public newsID = 0;

  news: any = {};

  /**
   *
   * @param {LanguageService} languageService
   * @param {ActivatedRoute} route
   * @memberof NewsPostComponent
   */
  constructor(public languageService: LanguageService, private newsService: NewsService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.newsService.getSingleNews(params['slug']).subscribe(response => {
        this.news = response.article;
        console.log('single news: ', this.news);
      });
    });
    // this.routerSubscription = this.route.params.subscribe(params => {
    //   this.newsID = params['id'];
    // });
  }

  /**
   * @ignore
   *
   * @memberof NewsPostComponent
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetch data from API
   *
   * @memberof NewsPostComponent
   */
  getData() {}

  /**
   * @ignore
   *
   * @memberof NewsPostComponent
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
