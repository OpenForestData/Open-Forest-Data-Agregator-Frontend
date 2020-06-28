import { Component, OnInit, Input } from '@angular/core';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-active-filters',
  templateUrl: './datasets-active-filters.component.html',
  styleUrls: ['./datasets-active-filters.component.scss']
})
export class DatasetsActiveFiltersComponent implements OnInit {
  constructor(public DSService: DatasetsService) {}

  @Input() activeFilters: any;

  removeFilter(name, index) {
    this.DSService.removeFilterSubject.next({ name, index });
  }

  ngOnInit() {}

  getDateValue(date) {
    if (date) {
      if (date.format) {
        return date.format('YYYY-MM-DD');
      }
    }

    return date;
  }
}
