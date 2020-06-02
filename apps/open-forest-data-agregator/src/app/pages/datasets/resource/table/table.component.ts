import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() resource;
  tableHeader: any = ['2015 r.', 'I semestr 2016 r.', 'II semestr 2016 r.', 'NAZWA PLACÓWKI'];
  tableData: any;
  constructor() {}

  ngOnInit() {
    this.convertToTable();
  }

  // TODO: Connect API and covert CSV
  convertToTable() {}
}
