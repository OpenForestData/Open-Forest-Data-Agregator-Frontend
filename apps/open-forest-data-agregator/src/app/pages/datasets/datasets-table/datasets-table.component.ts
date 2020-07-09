import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DatasetsService } from '../datasets.service';
/**
 * Datasets view as table
 *
 * @export
 * @class DatasetsTableComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-datasets-table',
  templateUrl: './datasets-table.component.html',
  styleUrls: ['./datasets-table.component.scss']
})
export class DatasetsTableComponent implements OnInit {
  /**
   * Datasets
   *
   * @type {any[]}
   * @memberof DatasetsTableComponent
   */
  @Input() datasets: any[];

  /**
   * Emit event on fullscreen state change
   *
   * @type {EventEmitter<any>}
   * @memberof DatasetsTableComponent
   */
  @Output() fullscreenEvent: EventEmitter<any> = new EventEmitter();

  /**
   * Data table options
   *
   * @type {*}
   * @memberof DatasetsTableComponent
   */
  dtOptions: any = {};

  /**
   * Fullscreen current state
   *
   * @memberof DatasetsTableComponent
   */
  public fullScreen = false;

  /**
   * Creates an instance of DatasetsTableComponent.
   * @param {DatasetsService} DSService
   * @memberof DatasetsTableComponent
   */
  constructor(public DSService: DatasetsService) {}

  /**
   * Gets pagination page size
   *
   * @readonly
   * @memberof DatasetsTableComponent
   */
  public get paginationsSize() {
    return this.DSService.searchFilters.data.rows;
  }

  /**
   * Enters data table full screen mode
   *
   * @memberof DatasetsTableComponent
   */
  showFullscreen() {
    this.DSService.hideHeader = true;
    this.fullScreen = true;
    this.fullscreenEvent.emit(true);
  }

  /**
   * Closes data table full screen mode
   *
   * @memberof DatasetsTableComponent
   */
  hideFullscreen() {
    this.DSService.hideHeader = false;
    this.fullScreen = false;
    this.fullscreenEvent.emit(false);
  }

  /**
   * Init datatables
   *
   * @memberof DatasetsTableComponent
   */
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.paginationsSize,
      dom: 'Bfrtip',
      bPaginate: false,
      bInfo: false,
      scrollY: '73vh',
      scrollCollapse: true,
      scrollX: true,
      // responsive: true,
      buttons: [
        'copy',
        'print',
        'excel',
        {
          extend: 'pdfHtml5',
          orientation: 'landscape',
          pageSize: {
            // This need to be changed based on keys for width and amount datasets for height
            width: 150 * this.datasets.length,
            height: 25 * this.datasets.length
          }
        },
        {
          text: 'Fullscreen',
          titleAttr: 'Fullscreen',
          className: 'fullscreen',
          action: () => {
            if (!this.fullScreen) {
              this.showFullscreen();
            } else {
              this.hideFullscreen();
            }
          }
        }
      ]
    };
  }
}
