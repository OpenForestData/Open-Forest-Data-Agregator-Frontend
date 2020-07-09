import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetsService } from '../datasets.service';
import { Subscription } from 'rxjs';
/**
 * Datasets as list
 *
 * @export
 * @class DatasetsListComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.scss']
})
export class DatasetsListComponent implements OnDestroy {
  /**
   * Sort select options
   *
   * @memberof DatasetsListComponent
   */
  public sortItems = [
    { name: 'A-Z', value: 1 },
    { name: 'Z-A', value: 0 }
  ];

  /**
   * Current selected sort options
   *
   * @memberof DatasetsListComponent
   */
  public sortBy = this.sortItems[0];

  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof DatasetsListComponent
   */
  public sub: Subscription;

  /**
   * UI Select options
   *
   * @type {IUISelectOptions}
   * @memberof DatasetsListComponent
   */
  public options: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };

  /**
   * Datasets
   *
   * @type {any[]}
   * @memberof DatasetsListComponent
   */
  @Input() datasets: any[];

  /**
   * Sort value change callback
   *
   * @param {*} sortValue
   * @memberof DatasetsListComponent
   */
  sortChanged(sortValue) {
    this.DSService.searchFilters = { field: 'sort', data: sortValue.value ? 'asc' : 'desc', search: true };
  }

  /**
   * Creates an instance of DatasetsListComponent.
   * @param {DatasetsService} DSService
   * @memberof DatasetsListComponent
   */
  constructor(public DSService: DatasetsService) {
    this.sub = this.DSService.sortSubject.subscribe(_ => {
      this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
    });
  }

  /**
   * @ignore
   *
   * @memberof DatasetsListComponent
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
