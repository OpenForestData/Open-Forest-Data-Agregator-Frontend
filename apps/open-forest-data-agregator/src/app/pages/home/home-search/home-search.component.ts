import { Component } from '@angular/core';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { Router } from '@angular/router';

/**
 * Search section at home page
 */
@Component({
  selector: 'ofd-agregator-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss', '../home.media.scss']
})
export class HomeSearchComponent {
  /**
   * Input search value
   */
  public searchValue = '';

  /**
   * Dataset of the day
   */
  public datasetOfTheDay: {
    /**
     * Dataset name
     */
    name: string;
    /**
     * Dataset latin name
     */
    latinName: string;
    /**
     * Dataset preview URL
     */
    preview: string;
    /**
     * Dataset DOI
     */
    identifier64: string;
  } = null;

  /**
   * Creates an instance of HomeSearchComponent.
   * @param {DatasetsService} DSService Datasets service
   * @param {Router} router Router
   */
  constructor(public DSService: DatasetsService, public router: Router) {
    this.DSService.getDatasetOfTheDay().subscribe(response => {
      try {
        this.datasetOfTheDay = {
          name: response['latestVersion']['metadataBlocks']['citation']['fields'].filter(
            field => field['typeName'] === 'title'
          )[0]['value'],
          preview:
            response['latestVersion']['files']
              .filter((_: any) => _.thumbnail_url)
              .map((_: any) => _.thumbnail_url)[0] || null,
          latinName: '',
          identifier64: btoa(response['latestVersion']['datasetPersistentId'])
        };
      } catch (e) {}
    });
  }

  /**
   * Redirects to datasets view with serach params set
   */
  search() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue, search: true };
    this.DSService.updateQuerySubject.next(this.searchValue);
    this.router.navigate(['/datasets'], { queryParams: { start: 0, rows: 15, q: this.searchValue } });
  }
}
