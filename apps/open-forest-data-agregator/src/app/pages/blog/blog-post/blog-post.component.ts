import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '@app/services/blog.service';

import { BlogArticle } from '@app/interfaces/blog-article';

/**
 * Blog post component
 */
@Component({
  selector: 'ofd-agregator-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['../blog.component.scss', './blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  /**
   * Router subscription
   */
  public routerSubscription: Subscription = new Subscription();
  /**
   * Language subscription
   */
  public languageSubscription: Subscription = new Subscription();
  /**
   * Article
   */
  public article: BlogArticle;

  /**
   * Post related posts
   */
  public relatedPosts: BlogArticle[] = [];

  /**
   * Blog post constructor
   *
   * @param {LanguageService} languageService Language service
   * @param {ActivatedRoute} route Route
   * @param {BlogService} blogService Blog service
   */
  constructor(public languageService: LanguageService, public route: ActivatedRoute, public blogService: BlogService) {}

  /**
   * Initialize on start and get data based on params in URL
   */
  ngOnInit() {
    // this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
    this.route.params.subscribe(params => {
      this.blogService.getBlogSlug(params['slug']).subscribe(response => {
        this.article = response['article'];
        this.relatedPosts = response['related_posts'] ? response['related_posts'].slice(0, 2) : [];
      });
    });
  }

  /**
   * Creates link for keyword
   * @param keywordSlug Keyword slug
   */
  createKeywordsLink(keywordSlug) {
    return window.location.origin + '/blog?keyword=' + keywordSlug;
  }

  /**
   * Unsubscribes to subscribed items
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
