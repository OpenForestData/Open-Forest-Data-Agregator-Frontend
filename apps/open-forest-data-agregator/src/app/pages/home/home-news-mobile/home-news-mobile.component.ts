import { Component } from '@angular/core';
import { HomeNewsComponent } from '../home-news/home-news.component';
/**
 * Mobile view of news at home page
 *
 * @export
 * @class HomeNewsMobileComponent
 * @extends {HomeNewsComponent}
 */
@Component({
  selector: 'ofd-agregator-home-news-mobile',
  templateUrl: './home-news-mobile.component.html',
  styleUrls: [
    '../home-news/home-news.component.scss',
    '../home-search/home-search.component.scss',
    './home-news-mobile.component.scss'
  ]
})
export class HomeNewsMobileComponent extends HomeNewsComponent {
  /**
   * Current slide
   *
   * @memberof HomeNewsMobileComponent
   */
  public mobileActiveNews = 0;

  /**
   * Next slide
   *
   * @memberof HomeNewsMobileComponent
   */
  swipeLeftNews() {
    this.mobileActiveNews += 1;
    this.mobileActiveNews = this.mobileActiveNews > 2 ? 0 : this.mobileActiveNews;
  }

  /**
   * Previous slide
   *
   * @memberof HomeNewsMobileComponent
   */
  swipeRightNews() {
    this.mobileActiveNews -= 1;
    this.mobileActiveNews = this.mobileActiveNews < 0 ? 0 : this.mobileActiveNews;
  }
}
