import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-table',
  templateUrl: './datasets-table.component.html',
  styleUrls: ['./datasets-table.component.scss']
})
export class DatasetsTableComponent implements OnInit {
  @Input() datasets: any[];
  @Output() fullscreenEvent: EventEmitter<any> = new EventEmitter();

  dtOptions: any = {};

  public fullScreen = false;

  constructor(public DSService: DatasetsService) {}

  public get paginationsSize() {
    return this.DSService.searchFilters.data.rows;
  }

  showFullscreen() {
    this.DSService.hideHeader = true;
    this.fullScreen = true;
    this.fullscreenEvent.emit(true);
  }

  hideFullscreen() {
    this.DSService.hideHeader = false;
    this.fullScreen = false;
    this.fullscreenEvent.emit(false);
  }

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
          pageSize: 'LEGAL'
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
