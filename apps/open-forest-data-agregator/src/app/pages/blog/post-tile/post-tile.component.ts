import { Component, Input } from '@angular/core';
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
  @Input() article;
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
