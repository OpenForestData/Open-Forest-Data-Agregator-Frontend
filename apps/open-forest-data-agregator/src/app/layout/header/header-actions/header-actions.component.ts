import { Component, OnInit } from '@angular/core';

import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss']
})
export class HeaderActionsComponent implements OnInit {
  public searchActive = false;
  public searchPhrase = '';

  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {}

  searchClick() {
    if (!this.searchActive) {
      this.searchActive = true;
    } else {
      if (this.searchPhrase) {
        // Do Search
      }
    }
  }

  setNewLanguage(value) {
    this.languageService.language = value;
  }
}
