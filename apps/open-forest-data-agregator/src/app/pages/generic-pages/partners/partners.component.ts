import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

/**
 * Partner page view
 */
@Component({
  selector: 'ofd-agregator-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit, OnDestroy {
  /**
   * Language change subscription
   */
  public languageSubscription: Subscription = new Subscription();

  /**
   * Partners component constructor
   * @param {LanguageService} languageService Language service
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
