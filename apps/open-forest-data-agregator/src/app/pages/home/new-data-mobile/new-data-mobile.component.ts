import { Component, OnInit } from '@angular/core';
import { NewDataComponent } from '@app/pages/home/new-data/new-data.component';

/**
 * Mobile section of New Data
 */
@Component({
  selector: 'ofd-agregator-new-data-mobile',
  templateUrl: './new-data-mobile.component.html',
  styleUrls: ['../new-data/new-data.component.scss', './new-data-mobile.component.scss']
})
export class NewDataMobileComponent extends NewDataComponent implements OnInit {
  /**
   * Active slide
   *
   * @memberof NewDataMobileComponent
   */
  public mobileActiveData = 0;
  /**
   * Add data buttons
   */
  buttonsAddData = [];

  /**
   * Initialize on start fetch data for buttons
   */
  ngOnInit() {
    this.getButtons();
    this.getLastAddedDatasets();
  }

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
