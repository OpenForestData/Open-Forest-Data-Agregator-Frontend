import { Component, OnInit, OnDestroy } from '@angular/core';

import { LanguageService } from '@app/services/language.service';
import { Router } from '@angular/router';
import { DatasetService } from '@app/services/dataset.service';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ofd-agregator-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss']
})
export class HeaderActionsComponent implements OnInit, OnDestroy {
  public searchActive = false;
  public searchPhrase = '';
  public sub: Subscription;

  constructor(public languageService: LanguageService, public router: Router, public DSService: DatasetsService) {}

  ngOnInit(): void {
    this.sub = this.DSService.updateQuerySubject.subscribe(query => (this.searchPhrase = query));
  }

  searchClick() {
    if (!this.searchActive) {
      this.searchActive = true;
    } else {
      this.DSService.searchFilters = { field: 'q', data: this.searchPhrase };
      this.DSService.updateQuerySubject.next(this.searchPhrase);
      if (this.router.url.split('?')[0] !== '/datasets') {
        this.router.navigate(['/datasets?start=0&rows=15&q=' + this.searchPhrase]);
      }
    }
  }

  setNewLanguage(value) {
    this.languageService.language = value;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
