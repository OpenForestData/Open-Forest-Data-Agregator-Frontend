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
  constructor(public utilService: UtilsService, public sanitizer: DomSanitizer) {}
}
