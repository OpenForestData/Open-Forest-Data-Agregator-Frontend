import { Component } from '@angular/core';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { Router } from '@angular/router';

// TODO Obiekt dnia
/**
 * Search section at home page
 *
 * @export
 * @class HomeSearchComponent
 */
@Component({
  selector: 'ofd-agregator-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss', '../home.media.scss']
})
export class HomeSearchComponent {
  /**
   * Input search value
   *
   * @memberof HomeSearchComponent
   */
  public searchValue = '';

  public datasetOfTheDay: {
    name: string;
  } = null;

  /**
   * Creates an instance of HomeSearchComponent.
   * @param {DatasetsService} DSService
   * @param {Router} router
   * @memberof HomeSearchComponent
   */
  constructor(public DSService: DatasetsService, public router: Router) {
    this.DSService.getDatasetOfTheDay().subscribe(response => {
      try {
        this.datasetOfTheDay = {
          name: response['latestVersion']['metadataBlocks']['citation']['fields'].filter(
            field => field['typeName'] === 'title'
          )[0]['value']
        };
      } catch (e) {}
    });
  }

  /**
   * Redirects to datasets view with serach params set
   *
   * @memberof HomeSearchComponent
   */
  search() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue, search: true };
    this.DSService.updateQuerySubject.next(this.searchValue);
    this.router.navigate(['/datasets'], { queryParams: { start: 0, rows: 15, q: this.searchValue } });
  }
}
