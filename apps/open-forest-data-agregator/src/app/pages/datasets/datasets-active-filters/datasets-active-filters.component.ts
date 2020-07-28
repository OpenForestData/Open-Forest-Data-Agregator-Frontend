import { Component, Input } from '@angular/core';
import { DatasetsService } from '../datasets.service';
/**
 * Datasets active filters component
 */
@Component({
  selector: 'ofd-agregator-datasets-active-filters',
  templateUrl: './datasets-active-filters.component.html',
  styleUrls: ['./datasets-active-filters.component.scss']
})
export class DatasetsActiveFiltersComponent {
  /**
   * Creates an instance of DatasetsActiveFiltersComponent.
   * @param {DatasetsService} DSService Datasets service
   */
  constructor(public DSService: DatasetsService) {}

  /**
   * Active filters
   */
  @Input() activeFilters: any;

  /**
   * Send action to subject to remove filter
   */
  removeFilter(name, index) {
    this.DSService.removeFilterSubject.next({ name, index });
  }

  /**
   * Parses moment value to readable date format
   *
   * @param {*} date Date
   */
  getDateValue(date) {
    if (date) {
      if (date.format) {
        return date.format('YYYY-MM-DD');
      }
    }

    return date;
  }
}
