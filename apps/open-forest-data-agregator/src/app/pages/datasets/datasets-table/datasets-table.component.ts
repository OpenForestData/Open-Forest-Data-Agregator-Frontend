import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-table',
  templateUrl: './datasets-table.component.html',
  styleUrls: ['./datasets-table.component.scss']
})
export class DatasetsTableComponent implements OnInit {
  @Input() datasets: any[];

  dtOptions: any = {};

  constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',
      responsive: true,
      buttons: ['copy', 'print', 'excel', 'pdfHtml5']
    };
  }
}
