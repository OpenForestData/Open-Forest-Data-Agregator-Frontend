import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ofd-agregator-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['../news.component.scss', './news-post.component.scss']
})
export class NewsPostComponent implements OnInit, OnDestroy {
  public routerSubscription: Subscription = new Subscription();
  public languageSubscription: Subscription = new Subscription();
  public newsID = 0;

  constructor(public languageService: LanguageService, public route: ActivatedRoute) {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.newsID = params['id'];
    });
  }

  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  getData() {}

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
