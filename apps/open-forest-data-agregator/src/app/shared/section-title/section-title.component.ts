import { Component, Input } from '@angular/core';
/**
 * Creates title section, with green bar at bottom
 *
 * @export
 * @class SectionTitleComponent
 */
@Component({
  selector: 'ofd-agregator-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  /**
   * URL for icon beside title
   *
   * @memberof SectionTitleComponent
   */
  @Input() iconURL = '';
  /**
   * Title content, normal text or as `translate` pipe value
   *
   * @memberof SectionTitleComponent
   */
  @Input() titleText = '';

  /**
   * Whatever green line should bre from both side
   *
   * @memberof SectionTitleComponent
   */
  @Input() dobuleSideLine = false;
}
