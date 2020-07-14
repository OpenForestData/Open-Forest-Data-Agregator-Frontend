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
  public buttonsAddData = [];
  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.getButtons();
  }

  getButtons() {
    this.utilsService.getWholeStructure().subscribe(response => {
      this.buttonsAddData = response['add_menu'];
    });
  }
}
