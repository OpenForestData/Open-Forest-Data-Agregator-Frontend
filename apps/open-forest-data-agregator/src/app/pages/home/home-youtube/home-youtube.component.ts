import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Youtube section at home
 *
 * @export
 * @class HomeYoutubeComponent
 */
@Component({
  selector: 'ofd-agregator-home-youtube',
  templateUrl: './home-youtube.component.html',
  styleUrls: ['./home-youtube.component.scss', '../home.media.scss']
})
export class HomeYoutubeComponent {
  /**
   * Home Youtube constructor
   * @param {UtilsService} utilService Utils service
   * @param {DomSanitizer} sanitizer Sanitizer
   */
  constructor(public utilService: UtilsService, public sanitizer: DomSanitizer) {}

  /**
   * Change link and sanitize it
   * @param link Link to video
   */
  createYTLink(link) {
    const url = link.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
