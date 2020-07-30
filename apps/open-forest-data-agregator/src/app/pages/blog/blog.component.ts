import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { BlogService } from '@app/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, takeLast } from 'rxjs/operators';
import { BlogArticle } from '@app/interfaces/blog-article';
import { BlogData } from '@app/interfaces/blog-data';

/**
 * Blog component
 */
@Component({
  selector: 'ofd-agregator-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  /**
   * Blog data object
   */
  public blogData: BlogData;
  /**
   * Newest article object
   */
  newestArticle: BlogArticle;
  /**
   * Filters object
   */
  filters = { page: 1, limit: 4, keyword: '' };

  /**
   * Value holder for scroll
   */
  globalScrollValue = 1;

  /**
   * Maximum amount of pages
   */
  maxPages;

  /**
   * Language subscription
   */
  public languageSubscription: Subscription = new Subscription();

  public isLocked = false;

  /**
   * Blog constructor
   *
   * @param {LanguageService} languageService Language Service
   * @param {BlogService} blogService Blog Service
   * @param {ActivatedRoute} route Route
   */
  constructor(public languageService: LanguageService, public blogService: BlogService, public route: ActivatedRoute) {}

  // TODO - nie działa fitlrownie po keywords'ach
  /**
   * Initialize at the start of page and fetch blog information, takes arguments from URL
   */
  ngOnInit() {
    this.route.queryParams
      .pipe(
        takeWhile(val => val === undefined, true),
        takeLast(1)
      )
      .subscribe(params => {
        Object.keys(this.filters).forEach(filter => {
          if (params[filter]) {
            this.filters[filter] = decodeURIComponent(params[filter]);
          }
        });
        this.getData();
      });
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetches blog data
   */
  getData(filters = this.filters) {
    this.filters = filters;
    this.blogService.getBlog(filters).subscribe(response => {
      if (response.articles && response.articles[0]) {
        this.newestArticle = response.articles[0];
      }
      this.blogData = response;
      this.maxPages = response.offset.num_pages;
    });
  }

  /**
   * Fetch data for scroll
   */
  getDataForScroll() {
    this.isLocked = true;
    this.filters.page = this.globalScrollValue;
    this.filters.limit = 4;
    this.blogService.getBlog(this.filters).subscribe(response => {
      this.isLocked = false;
      this.blogData.articles = [...this.blogData.articles, ...response.articles];
    });
  }

  /**
   * Destroy component on web leave and unsubscribe subscriptions
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  /**
   * Check if bottom of page is reached and if so fetch data and load it
   */
  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isLocked)
      if (window.innerHeight + window.scrollY * 1.1 >= document.body.offsetHeight) {
        if (this.maxPages > this.globalScrollValue) {
          this.globalScrollValue++;
          this.getDataForScroll();
        }
      }
  }

  /**
   * Filter for keywords
   * @param keywordSlug Keyword url
   */
  keywordFilter(keywordSlug: any) {
    const params: any = new URLSearchParams(location.search);
    params.set('keyword', keywordSlug);
    location.search = params;
    // location.href = '/blog?keyword='
    // this.filters.keyword = keywordSlug;
    // this.getData({ ...this.filters, page: 1 });
    // this.blogService.getArticlesByKeyword(keywordUrl).subscribe(response => {
    //   this.blogData = response;
    // });
  }
}
