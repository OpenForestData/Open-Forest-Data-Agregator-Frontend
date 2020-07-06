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

  constructor(public languageService: LanguageService, public route: ActivatedRoute, public blogService: BlogService) {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.newsID = params['id'];
    });
  }

  ngOnInit() {
    for (let i = 0; i < 25; i++) this.randomWords.push(this.random());
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
    this.route.params.subscribe(params => {
      console.log('params: ', params);
      this.blogService.getBlogSlug(params['slug']).subscribe(response => {
        console.log('slug reponse: ', response);
      });
    });
  }

  random() {
    const words = [
      ...'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident.'.split(' '),
      ...'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident.'.split('e')
    ];

    return words[Math.floor(Math.random() * words.length - 1)];
  }

  getData() {}

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
