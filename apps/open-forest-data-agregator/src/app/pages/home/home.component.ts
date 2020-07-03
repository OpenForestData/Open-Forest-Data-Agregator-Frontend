import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { LanguageService } from '@app/services/language.service';
import { Subscription } from 'rxjs';

/**
 * Home component
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-home',
  templateUrl: './home.component.html',
  styles: [
    `
      ofd-home-slider {
        position: relative;
        display: block;
      }
    `
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   * Language subscription
   *
   * @type {Subscription}
   * @memberof HomeComponent
   */
  public languageSubscription: Subscription = new Subscription();

  /**
   *
   * @param {LanguageService} languageService
   * @param {UIModalService} modal
   * @memberof HomeComponent
   */
  constructor(public languageService: LanguageService, public modal: UIModalService) {}

  /**
   * @ignore
   *
   * @memberof HomeComponent
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetch data from API
   *
   * @memberof HomeComponent
   */
  getData() {}

  /**
   * @ignore
   *
   * @memberof HomeComponent
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  /**
   * Close modal
   *
   * @memberof HomeComponent
   */
  onModalClose() {
    this.modal.close('contact-modal');
  }
}
