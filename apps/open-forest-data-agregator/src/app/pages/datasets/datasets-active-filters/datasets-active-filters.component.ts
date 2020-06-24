import { Component, OnInit } from '@angular/core';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-active-filters',
  templateUrl: './datasets-active-filters.component.html',
  styleUrls: ['./datasets-active-filters.component.scss']
})
export class DatasetsActiveFiltersComponent implements OnInit {
  constructor(public DSService: DatasetsService) {}

  public get activeFilters() {
    return this.DSService.activeFiltersArray;
  }

  ngOnInit() {}
}
