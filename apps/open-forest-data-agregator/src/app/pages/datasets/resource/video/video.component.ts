import { Component, Input } from '@angular/core';

/**
 * Video component
 */
@Component({
  selector: 'ofd-agregator-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  /**
   * Resource
   */
  @Input() resource;
}
