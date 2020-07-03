import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
/**
 * About resources page view
 *
 * @export
 * @class AboutResourcesComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-about-resources',
  templateUrl: './about-resources.component.html',
  styleUrls: ['./about-resources.component.scss']
})
export class AboutResourcesComponent implements OnInit, OnDestroy {
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
