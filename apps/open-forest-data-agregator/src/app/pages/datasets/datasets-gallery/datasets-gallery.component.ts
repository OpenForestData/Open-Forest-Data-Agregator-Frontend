import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import 'lightgallery.js';
import 'lg-zoom.js';
import 'lg-autoplay.js';
import 'lg-fullscreen.js';
import 'lg-thumbnail.js';

import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetsService } from '../datasets.service';
import { Subscription } from 'rxjs';
import { UtilsService } from '@app/services/utils.service';
/**
 * Gallery view of dataset
 */
@Component({
  selector: 'ofd-agregator-datasets-gallery',
  templateUrl: './datasets-gallery.component.html',
  styleUrls: ['./datasets-gallery.component.scss']
})
export class DatasetsGalleryComponent implements OnInit, OnDestroy {
  /**
   * Sort select options
   */
  public sortItems = [
    { name: 'A-Z', value: 1 },
    { name: 'Z-A', value: 0 }
  ];

  /**
   * Current selected sort options
   */
  public sortBy = this.sortItems[0];

  /**
   * @ignore
   */
  public sub: Subscription;

  /**
   * UI Select options
   */
  public options: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };

  /**
   * Datasets
   */
  @Input() datasets: any[];

  /**
   * Creates an instance of DatasetsGalleryComponent.
   * @param {DatasetsService} DSService Datasets service
   * @param {UtilsService} utilsService Utility service
   * @memberof DatasetsGalleryComponent
   */
  constructor(public DSService: DatasetsService, public utilsService: UtilsService) {
    this.sub = this.DSService.sortSubject.subscribe(_ => {
      this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
    });
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
  }

  /**
   * Change sort value
   *
   * @param {*} sortValue
   */
  sortChanged(sortValue) {
    this.DSService.searchFilters = { field: 'sort', data: sortValue.value ? 'asc' : 'desc', search: true };
  }

  /**
   * Generate gallery view via lightGallery plugin
   *
   * @param {*} index
   * @param {*} el
   */
  showGallery(index, el) {
    const item = { images: [], labels: [] };
    const datasetsFromIndex = this.datasets.slice(index, this.datasets.length);
    datasetsFromIndex.forEach((dataset: any) => {
      dataset.images.forEach(image => {
        item.images.push(image);
      });
      dataset.labels.forEach(label => {
        item.labels.push(label);
      });
    });
    const dynamicEl = item.images.map((img, imgIndex) =>
      Object.create({
        src: img,
        thumb: img,
        subHtml: `${item.labels[imgIndex]}`
      })
    );

    // @ts-ignore
    window.lightGallery(el, {
      dynamic: true,
      dynamicEl
    });
  }

  /**
   * @ignore
   *
   * @memberof DatasetsGalleryComponent
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
