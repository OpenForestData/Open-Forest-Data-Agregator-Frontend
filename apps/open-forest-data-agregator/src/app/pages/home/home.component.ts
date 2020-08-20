import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { LanguageService } from '@app/services/language.service';
import { Subscription } from 'rxjs';
import { UtilsService } from '@app/services/utils.service';

/**
 * Home component
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
   */
  public languageSubscription: Subscription = new Subscription();

  /**
   * Home component
   * @param {LanguageService} languageService Language service
   * @param {UIModalService} modal UI Modal service
   * @param {UtilsService} utilService Utils service
   */
  constructor(
    public languageService: LanguageService,
    public modal: UIModalService,
    public utilService: UtilsService
  ) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.getData();
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetch data from API
   */
  getData() {
    this.utilService.getHomePage().subscribe(response => {
      this.utilService.homePageData = response;
      this.utilService.setSEO(response);
    });
  }

  /**
   * @ignore
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  /**
   * Close modal
   */
  onModalClose() {
    this.modal.close('contact-modal');
  }
}
