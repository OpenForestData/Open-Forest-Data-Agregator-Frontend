import { Component, OnInit } from '@angular/core';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-header',
  templateUrl: './datasets-header.component.html',
  styleUrls: ['./datasets-header.component.scss']
})
export class DatasetsHeaderComponent implements OnInit {
  public searchValue = '';

  constructor(public DSService: DatasetsService) {}

  ngOnInit(): void {}

  search() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue };
  }
}
