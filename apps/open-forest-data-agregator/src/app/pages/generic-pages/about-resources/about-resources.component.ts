import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

/**
 * About resources page view
 */
@Component({
  selector: 'ofd-agregator-about-resources',
  templateUrl: './about-resources.component.html',
  styleUrls: ['./about-resources.component.scss']
})
export class AboutResourcesComponent implements OnInit, OnDestroy {
  /**
   * Language change subscription
   */
  public languageSubscription: Subscription = new Subscription();
  /**
   * About resources constructor
   * @param {LanguageService} languageService Language service
   * @memberof HomeNewsComponent
   */
  constructor(public languageService: LanguageService) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetch data from API
   */
  getData() {}

  /**
   * @ignore
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
