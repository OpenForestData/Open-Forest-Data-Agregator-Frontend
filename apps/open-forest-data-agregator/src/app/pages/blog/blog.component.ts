import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { BlogService } from '@app/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, takeLast } from 'rxjs/operators';

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
  public blogData: any = {};
  /**
   * Newest article object
   */
  newestArticle: any = {};
  /**
   * Filters object
   */
  filters = { page: 1, limit: 4, keyword: '' };

  globalScrollValue = 1;

  maxPages;

  /**
   * Language subscription
   */
  public languageSubscription: Subscription = new Subscription();

  /**
   * Blog constructor
   * @param {LanguageService} languageService Language Service
   * @param {BlogService} blogService Blog Service
   */
  constructor(public languageService: LanguageService, public blogService: BlogService, public route: ActivatedRoute) {}

  /**
   * Initialize at the start of page and fetch blog informations, takes arguments from URL
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
            console.log('decore filter: ', decodeURIComponent(params[filter]));
          }
        });
        console.log('init filters: ', this.filters);
        this.getData();
      });
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetches blog data
   */
  getData(filters = this.filters) {
    this.filters = filters;
    console.log('this filter get data: ', filters);
    this.blogService.getBlog(filters).subscribe(response => {
      this.newestArticle = response.articles[0];
      this.blogData = response;
      console.log('blog response: ', response);
      console.log('nestwest article: ', this.newestArticle);
      console.log('this blog data: ', this.blogData);
      this.maxPages = response.offset.num_pages;
    });
  }

  getDataForScroll() {
    this.blogService.getBlog({ page: this.globalScrollValue, limit: 4, keyword: '' }).subscribe(response => {
      this.blogData.articles = [...this.blogData.articles, ...response.articles];
    });
  }

  /**
   * Change of pagination
   * @param payload Payload
   */
  paginationChange(payload) {}

  /**
   * Destroy component on web leave and unsubscribe subscriptions
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (window.innerHeight + window.scrollY * 1.1 >= document.body.offsetHeight) {
      if (this.maxPages > this.globalScrollValue) {
        this.globalScrollValue++;
        this.getDataForScroll();
      }
    }
  }

  keywordFilter(keywordUrl: any) {
    this.blogService.getArticlesByKeyword(keywordUrl).subscribe(response => {
      this.blogData = response;
    });
  }
}
