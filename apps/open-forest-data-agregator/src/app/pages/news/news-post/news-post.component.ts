import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '@app/services/news.service';

/**
 * View of news post
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

  /**
   * News data
   */
  public news: any = {};

  /**
   * Change image position on scroll
   */
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const header: HTMLElement = document.querySelector('ofd-header header');
    const imageHolder: HTMLElement = document.querySelector('.news-image-holder');
    const newsContent: HTMLElement = document.querySelector('.news-container');

    const headerHeight = header.clientHeight - 70;

    const maxTranslate = newsContent.clientHeight - imageHolder.clientHeight - 40;
    const translate = window.scrollY + headerHeight - imageHolder.offsetTop + 10;

    imageHolder.style.transform =
      imageHolder.offsetTop <= window.scrollY + headerHeight
        ? `translateY(${translate <= maxTranslate ? translate : maxTranslate}px)`
        : `translateY(0)`;
  }

  /**
   * News post component constructor
   * @param {LanguageService} languageService Language service
   * @param {ActivatedRoute} route Activated route
   * @param {NewsService} newsService News service
   */
  constructor(public languageService: LanguageService, private newsService: NewsService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.newsService.getSingleNews(params['slug']).subscribe(response => {
        this.news = response.article;
      });
    });
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
