import { Component, OnInit, OnDestroy } from '@angular/core';

import { LanguageService } from '@app/services/language.service';
import { Router } from '@angular/router';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { Subscription } from 'rxjs';
/**
 * Language and search header section
 */
@Component({
  selector: 'ofd-agregator-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss']
})
export class HeaderActionsComponent implements OnInit, OnDestroy {
  /**
   * is search input collapsed
   */
  public searchActive = false;

  /**
   * Search input value
   */
  public searchPhrase = '';

  /**
   * Subscript for queryUpdate Subject
   */
  public sub: Subscription;

  /**
   * Header actions constructor component
   * @param {LanguageService} languageService Language service
   * @param {Router} router Router
   * @param {DatasetsService} DSService Datasets service
   */
  constructor(public languageService: LanguageService, public router: Router, public DSService: DatasetsService) {}

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.sub = this.DSService.updateQuerySubject.subscribe(query => (this.searchPhrase = query));
  }

  /**
   * Callback on search, redirect to datasets page, on emit event for search if already there
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
   * @param {string} value Language to set
   */
  setNewLanguage(value: string) {
    if (this.languageService.language !== value) this.languageService.language = value;
    window.location.reload();
  }

  /**
   * Unsubscribe subscriptions
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
