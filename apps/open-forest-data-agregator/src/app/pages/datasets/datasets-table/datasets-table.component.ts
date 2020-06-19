import { Component, Input, OnInit } from '@angular/core';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-table',
  templateUrl: './datasets-table.component.html',
  styleUrls: ['./datasets-table.component.scss']
})
export class DatasetsTableComponent implements OnInit {
  @Input() datasets: any[];

  dtOptions: any = {};

  constructor(public DSService: DatasetsService) {}

  public get paginationsSize() {
    return this.DSService.searchFilters.data.rows;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.paginationsSize,
      dom: 'Bfrtip',
      bPaginate: false,
      bInfo: false,
      responsive: true,
      buttons: ['copy', 'print', 'excel', 'pdfHtml5']
    };
  }
}
