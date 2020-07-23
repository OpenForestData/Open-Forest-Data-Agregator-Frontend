import { Component } from '@angular/core';
import { DatasetsService } from '../datasets.service';
/**
 * Component with category description above datasets
 *
 * @export
 * @class DatasetsCategoryDescriptionComponent
 */
@Component({
  selector: 'ofd-agregator-datasets-category-description',
  templateUrl: './datasets-category-description.component.html',
  styleUrls: ['./datasets-category-description.component.scss']
})
export class DatasetsCategoryDescriptionComponent {
  /**
   * Creates an instance of DatasetsCategoryDescriptionComponent.
   * @param {DatasetsService} DSService
   * @memberof DatasetsCategoryDescriptionComponent
   */
  constructor(public DSService: DatasetsService) {}

  /**
   * Get active category
   *
   * @readonly
   * @memberof DatasetsCategoryDescriptionComponent
   */
  public get category() {
    return this.DSService.searchFilters.data['category'];
  }
  /**
   * Get descrption for active category
   *
   * @memberof DatasetsCategoryDescriptionComponent
   */
  public get data() {
    try {
      return this.DSService.searchData['list']['categories_descriptions'][this.category];
    } catch (e) {
      return {};
    }
  }
}
