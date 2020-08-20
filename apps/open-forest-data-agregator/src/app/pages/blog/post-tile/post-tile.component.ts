import { Component, Input } from '@angular/core';
import { BlogTile } from '@app/interfaces/blog-tile';
import { BlogArticle } from '@app/interfaces/blog-article';
/**
 * Post tile component
 */
@Component({
  selector: 'ofd-agregator-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['../blog.component.scss', './post-tile.component.scss']
})
export class PostTileComponent {
  /**
   * Article input
   */
  @Input() article: BlogTile | BlogArticle;
  /**
   * Keyword link
   */
  keywordLink = '';

  /**
   * Creates link for keyword
   * @param keywordSlug Keyword slug
   */
  createKeywordsLink(keywordSlug) {
    return (this.keywordLink = window.location.origin + '/blog?keyword=' + keywordSlug);
  }
}
