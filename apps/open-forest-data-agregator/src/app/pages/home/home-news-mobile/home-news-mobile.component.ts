import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-home-news-mobile',
  templateUrl: './home-news-mobile.component.html',
  styleUrls: [
    '../home-news/home-news.component.scss',
    '../home-search/home-search.component.scss',
    './home-news-mobile.component.scss'
  ]
})
export class HomeNewsMobileComponent implements OnInit, OnDestroy {
  public mobileActiveNews = 0;
  public languageSubscription: Subscription = new Subscription();

  constructor(public languageService: LanguageService) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  getData() {}

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  swipeLeftNews() {
    this.mobileActiveNews += 1;
    this.mobileActiveNews = this.mobileActiveNews > 2 ? 0 : this.mobileActiveNews;
  }

  swipeRightNews() {
    this.mobileActiveNews -= 1;
    this.mobileActiveNews = this.mobileActiveNews < 0 ? 0 : this.mobileActiveNews;
  }
}
