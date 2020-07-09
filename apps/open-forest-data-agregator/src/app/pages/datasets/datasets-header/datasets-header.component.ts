import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatasetsService } from '../datasets.service';
import { Subscription } from 'rxjs';
/**
 * Header for datasets view
 *
 * @export
 * @class DatasetsHeaderComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-datasets-header',
  templateUrl: './datasets-header.component.html',
  styleUrls: ['./datasets-header.component.scss']
})
export class DatasetsHeaderComponent implements OnInit, OnDestroy {
  /**
   * Search input value
   *
   * @memberof DatasetsHeaderComponent
   */
  public searchValue = '';

  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof DatasetsHeaderComponent
   */
  public sub: Subscription;

  /**
   * Creates an instance of DatasetsHeaderComponent.
   * @param {DatasetsService} DSService
   * @memberof DatasetsHeaderComponent
   */
  constructor(public DSService: DatasetsService) {
    this.sub = this.DSService.updateQuerySubject.subscribe(query => {
      this.searchValue = query;
    });
  }

  /**
   * @ignore
   *
   * @memberof DatasetsHeaderComponent
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.searchValue = this.DSService.searchFilters.data['q'];
    }, 300);
  }

  /**
   * Runs search query
   *
   * @memberof DatasetsHeaderComponent
   */
  search() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue, search: true };
    this.DSService.updateQuerySubject.next(this.searchValue);
  }

  /**
   * Triggers advanced search
   *
   * @memberof DatasetsHeaderComponent
   */
  showAdvanced() {
    this.DSService.showAdvancedSubject.next();
  }

  /**
   * @ignore
   *
   * @memberof DatasetsHeaderComponent
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
