import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
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
   *
   * @param {LanguageService} languageService
   * @memberof HomeNewsComponent
   */
  constructor(public languageService: LanguageService) {}

  /**
   * @ignore
   *
   * @memberof HomeNewsComponent
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetch data from API
   *
   * @memberof HomeNewsComponent
   */
  getData() {}

  /**
   * @ignore
   *
   * @memberof HomeNewsComponent
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
