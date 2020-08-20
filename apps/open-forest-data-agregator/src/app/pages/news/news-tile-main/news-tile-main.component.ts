import { Component, Input } from '@angular/core';
/**
 * Main news tiles
 */
@Component({
  selector: 'ofd-agregator-news-tile-main',
  templateUrl: './news-tile-main.component.html',
  styleUrls: ['../news.component.scss', './news-tile-main.component.scss']
})
export class NewsTileMainComponent {
  /**
   * News item
   */
  @Input() news;
}
