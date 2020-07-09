import { Component, OnInit, OnDestroy } from '@angular/core';

import { LanguageService } from '@app/services/language.service';
import { Router } from '@angular/router';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { Subscription } from 'rxjs';
/**
 * Language and search header section
 *
 * @export
 * @class HeaderActionsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss']
})
export class HeaderActionsComponent implements OnInit, OnDestroy {
  /**
   * is search input collapsed
   *
   * @memberof HeaderActionsComponent
   */
  public searchActive = false;

  /**
   * Search input value
   *
   * @memberof HeaderActionsComponent
   */
  public searchPhrase = '';

  /**
   * Subscript for queryUpdateSuject
   *
   * @type {Subscription}
   * @memberof HeaderActionsComponent
   */
  public sub: Subscription;

  /**
   *
   * @param {LanguageService} languageService
   * @param {Router} router
   * @param {DatasetsService} DSService
   * @memberof HeaderActionsComponent
   */
  constructor(public languageService: LanguageService, public router: Router, public DSService: DatasetsService) {}

  /**
   * @ignore
   *
   * @memberof HeaderActionsComponent
   */
  ngOnInit(): void {
    this.sub = this.DSService.updateQuerySubject.subscribe(query => (this.searchPhrase = query));
  }

  /**
   * Callback on search, redirect to datasets page, on emit event for search if already there
   *
   * @memberof HeaderActionsComponent
   */
  searchClick() {
    if (!this.searchActive) {
      this.searchActive = true;
    } else {
      this.DSService.searchFilters = { field: 'q', data: this.searchPhrase, search: true };
      this.DSService.updateQuerySubject.next(this.searchPhrase);
      if (this.router.url.split('?')[0] !== '/datasets') {
        this.router.navigate(['/datasets'], { queryParams: { start: 0, rows: 15, q: this.searchPhrase } });
      }
    }
  }

  /**
   * Language change
   */
  setNewLanguage(value) {
    if (this.languageService.language !== value) this.languageService.language = value;
  }

  /**
   * Unsubscribe subscriptions
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
