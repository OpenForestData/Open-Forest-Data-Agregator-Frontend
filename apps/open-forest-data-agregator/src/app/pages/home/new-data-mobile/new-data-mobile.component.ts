import { Component, OnInit } from '@angular/core';
/**
 * Mobile section of New Data
 *
 * @export
 * @class NewDataMobileComponent
 */
@Component({
  selector: 'ofd-agregator-new-data-mobile',
  templateUrl: './new-data-mobile.component.html',
  styleUrls: ['../new-data/new-data.component.scss', './new-data-mobile.component.scss']
})
export class NewDataMobileComponent {
  /**
   * Active slide
   *
   * @memberof NewDataMobileComponent
   */
  public mobileActiveData = 0;

  /**
   * Swipe to next slide
   *
   * @memberof NewDataMobileComponent
   */
  swipeLeftNews() {
    this.mobileActiveData += 1;
    this.mobileActiveData = this.mobileActiveData > 2 ? 0 : this.mobileActiveData;
  }

  /**
   * Swipe to previous slide
   *
   * @memberof NewDataMobileComponent
   */
  swipeRightNews() {
    this.mobileActiveData -= 1;
    this.mobileActiveData = this.mobileActiveData < 0 ? 0 : this.mobileActiveData;
  }
}
