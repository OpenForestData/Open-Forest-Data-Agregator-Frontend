import { Component, OnInit } from '@angular/core';

import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss']
})
export class HeaderActionsComponent implements OnInit {
  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {}
}
