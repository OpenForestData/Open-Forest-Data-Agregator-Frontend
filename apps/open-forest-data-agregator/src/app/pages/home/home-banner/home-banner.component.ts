import { Component, OnInit } from '@angular/core';
/**
 * Banner component
 *
 * @export
 * @class HomeBannerComponent
 */
@Component({
  selector: 'ofd-agregator-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss', '../home.media.scss']
})
export class HomeBannerComponent {
  /**
   * If categories are visible at mobile
   *
   * @memberof HomeBannerComponent
   */
  public showMobileCategories = false;
}
