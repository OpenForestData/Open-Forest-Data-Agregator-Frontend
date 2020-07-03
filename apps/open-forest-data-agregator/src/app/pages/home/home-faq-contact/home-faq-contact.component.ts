import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
/**
 * FAQ view at home page
 *
 * @export
 * @class HomeFaqContactComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-home-faq-contact',
  templateUrl: './home-faq-contact.component.html',
  styleUrls: ['./home-faq-contact.component.scss', '../home.media.scss']
})
export class HomeFaqContactComponent implements OnInit, OnDestroy {
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
