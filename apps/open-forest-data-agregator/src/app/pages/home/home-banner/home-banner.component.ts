import { Component } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
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

  /**
   * Creates an instance of HomeBannerComponent.
   * @param {UtilsService} utilService
   * @memberof HomeBannerComponent
   */
  constructor(public utilService: UtilsService) {}
}
