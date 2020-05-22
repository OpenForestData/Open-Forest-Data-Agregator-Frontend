import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-home-news-mobile',
  templateUrl: './home-news-mobile.component.html',
  styleUrls: [
    '../home-news/home-news.component.scss',
    '../home-search/home-search.component.scss',
    './home-news-mobile.component.scss'
  ]
})
export class HomeNewsMobileComponent implements OnInit {
  public mobileActiveNews = 0;

  constructor() {}

  ngOnInit() {}

  swipeLeftNews() {
    this.mobileActiveNews += 1;
    this.mobileActiveNews = this.mobileActiveNews > 2 ? 0 : this.mobileActiveNews;
  }

  swipeRightNews() {
    this.mobileActiveNews -= 1;
    this.mobileActiveNews = this.mobileActiveNews < 0 ? 0 : this.mobileActiveNews;
  }
}
