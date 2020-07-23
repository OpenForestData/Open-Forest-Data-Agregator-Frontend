import { Component, Input } from '@angular/core';
import { DatasetsService } from '../datasets.service';
/**
 *
 *
 * @export
 * @class DatasetsActiveFiltersComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-datasets-active-filters',
  templateUrl: './datasets-active-filters.component.html',
  styleUrls: ['./datasets-active-filters.component.scss']
})
export class DatasetsActiveFiltersComponent {
  /**
   * Creates an instance of DatasetsActiveFiltersComponent.
   * @param {DatasetsService} DSService
   * @memberof DatasetsActiveFiltersComponent
   */
  constructor(public DSService: DatasetsService) {}

  /**
   * Active filters
   *
   * @type {*}
   * @memberof DatasetsActiveFiltersComponent
   */
  @Input() activeFilters: any;

  /**
   * Send action to subject to remove filter
   *
   * @param {*} name
   * @param {*} index
   * @memberof DatasetsActiveFiltersComponent
   */
  removeFilter(name, index) {
    this.DSService.removeFilterSubject.next({ name, index });
  }

  /**
   * Parses moment value to readable date format
   *
   * @param {*} date
   * @returns
   * @memberof DatasetsActiveFiltersComponent
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
