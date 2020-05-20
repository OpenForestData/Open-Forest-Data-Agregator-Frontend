import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.scss']
})
export class DatasetsListComponent implements OnInit {
  @Input() datasets: any[];

  constructor() {}

  ngOnInit(): void {}
}
