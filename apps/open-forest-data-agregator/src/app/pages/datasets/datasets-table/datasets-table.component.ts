import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-table',
  templateUrl: './datasets-table.component.html',
  styleUrls: ['./datasets-table.component.scss']
})
export class DatasetsTableComponent implements OnInit {
  @Input() datasets: any[];

  constructor() {}

  ngOnInit(): void {}
}
