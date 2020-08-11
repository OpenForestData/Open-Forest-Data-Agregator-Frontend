import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
import { DatasetsService } from '@app/pages/datasets/datasets.service';

/**
 * New data component for desktop
 */
@Component({
  selector: 'ofd-agregator-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.scss', '../home.media.scss']
})
export class NewDataComponent implements OnInit {
  /**
   * Add data buttons
   */
  public buttonsAddData = [];

  /**
   * Datasets list
   */
  public datasets = [];

  /**
   * New data constructor
   *
   * @param {UtilsService} utilsService Utils service
   * @param {DatasetsService} datasetsService Datasets service
   */
  constructor(public utilsService: UtilsService, public datasetsService: DatasetsService) {}

  /**
   * Initialize on start and fetch data for buttons
   */
  ngOnInit() {
    this.getButtons();
    this.getLastAddedDatasets();
  }

  /**
   * Create content for download buttons
   */
  getButtons() {
    this.utilsService.getWholeStructure().subscribe(response => {
      this.buttonsAddData = response['add_menu'];
    });
  }

  /**
   * Get last 3 added datasets
   */
  getLastAddedDatasets() {
    this.datasetsService.getLastAddedDatasets().subscribe(response => {
      this.datasets = response['list']['results'].map(dataset => {
        return {
          ...dataset,
          identifier64: btoa(dataset.identifier),
          link: location.protocol + '//' + location.host + '/datasets/details?doi=' + dataset.identifier
        };
      });
    });
  }

  /**
   * Share link to dataset in social
   * @param {string} link Link to dataset
   * @param {string} social Social type
   */
  shareLink(link: string, social: string) {
    switch (social) {
      case 'facebook': {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${link}`, '_blank noopener noreferrer');
        break;
      }

      case 'twitter': {
        window.open(`http://twitter.com/share?url=${link}`, '_blank noopener noreferrer');
        break;
      }

      case 'email': {
        window.open(`mailto:?subject=${encodeURIComponent(`${link}`)};body=${encodeURIComponent(`${link}`)}`);
        break;
      }
    }
  }
}
