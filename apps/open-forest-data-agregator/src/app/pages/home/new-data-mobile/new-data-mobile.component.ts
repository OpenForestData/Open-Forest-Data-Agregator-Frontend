import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
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
export class NewDataMobileComponent implements OnInit {
  /**
   * Active slide
   *
   * @memberof NewDataMobileComponent
   */
  public mobileActiveData = 0;

  buttonsAddData = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.getButtons();
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

  getButtons() {
    this.utilsService.getWholeStructure().subscribe(response => {
      this.buttonsAddData = response['add_menu'];
    });
  }
}
