import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
/**
 * New data component for desktop
 *
 * @export
 * @class NewDataComponent
 */
@Component({
  selector: 'ofd-agregator-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.scss', '../home.media.scss']
})
export class NewDataComponent implements OnInit {
  /**
   * Add data buttons
   */
  public buttonsAddData = [];

  /**
   * New data constructor
   *
   * @param {UtilsService} utilsService Utils service
   */
  constructor(private utilsService: UtilsService) {}

  /**
   * Initialize on start and fetch data for buttons
   */
  ngOnInit() {
    this.getButtons();
  }

  /**
   * Create content for download buttons
   */
  getButtons() {
    this.utilsService.getWholeStructure().subscribe(response => {
      this.buttonsAddData = response['add_menu'];
    });
  }
}
