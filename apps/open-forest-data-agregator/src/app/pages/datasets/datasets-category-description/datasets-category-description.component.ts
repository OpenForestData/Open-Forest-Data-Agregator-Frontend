import { Component } from '@angular/core';
import { DatasetsService } from '../datasets.service';

/**
 * Component with category description above datasets
 */
@Component({
  selector: 'ofd-agregator-datasets-category-description',
  templateUrl: './datasets-category-description.component.html',
  styleUrls: ['./datasets-category-description.component.scss']
})
export class DatasetsCategoryDescriptionComponent {
  /**
   * Creates an instance of DatasetsCategoryDescriptionComponent.
   * @param {DatasetsService} DSService Datasets service
   */
  constructor(public DSService: DatasetsService) {}

  /**
   * Get active category
   */
  public get category() {
    return this.DSService.searchFilters.data['category'];
  }

  /**
   * Get description for active category
   */
  public get data() {
    try {
      return this.DSService.searchData['list']['categories_descriptions'][this.category];
    } catch (e) {
      return {};
    }
  }
}
