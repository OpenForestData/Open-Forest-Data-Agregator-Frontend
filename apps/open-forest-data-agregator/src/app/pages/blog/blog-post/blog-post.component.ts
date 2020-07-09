import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '@app/services/blog.service';

@Component({
  selector: 'ofd-agregator-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['../blog.component.scss', './blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  public randomWords = [];

  public routerSubscription: Subscription = new Subscription();
  public languageSubscription: Subscription = new Subscription();
  public newsID = 0;
  public article: any = {};

  constructor(public languageService: LanguageService, public route: ActivatedRoute, public blogService: BlogService) {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.newsID = params['id'];
    });
  }

  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
    this.route.params.subscribe(params => {
      console.log('params: ', params);
      this.blogService.getBlogSlug(params['slug']).subscribe(response => {
        this.article = response.article[0];
        console.log('blog article: ', this.article);
      });
    });
  }

  getData() {}

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
