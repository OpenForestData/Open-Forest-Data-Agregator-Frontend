import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss', '../home.media.scss']
})
export class HomeNewsComponent implements OnInit, OnDestroy {
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
