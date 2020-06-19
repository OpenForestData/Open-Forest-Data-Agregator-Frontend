import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-about-resources',
  templateUrl: './about-resources.component.html',
  styleUrls: ['./about-resources.component.scss']
})
export class AboutResourcesComponent implements OnInit, OnDestroy {
  public languageSubscription: Subscription = new Subscription();
  constructor(public languageService: LanguageService) {}
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }
  getData() {}
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
