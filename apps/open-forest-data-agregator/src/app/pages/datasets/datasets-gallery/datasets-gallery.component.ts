import { AfterViewInit, Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';

import 'lightgallery.js';
import 'lg-zoom.js';
import 'lg-autoplay.js';
import 'lg-fullscreen.js';
import 'lg-thumbnail.js';

import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetsService } from '../datasets.service';
import { Subscription } from 'rxjs';
/**
 * Gallery view of dataset
 *
 * @export
 * @class DatasetsGalleryComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-datasets-gallery',
  templateUrl: './datasets-gallery.component.html',
  styleUrls: ['./datasets-gallery.component.scss']
})
export class DatasetsGalleryComponent implements OnInit, OnDestroy {
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
   * Creates an instance of DatasetsGalleryComponent.
   * @param {DatasetsService} DSService
   * @memberof DatasetsGalleryComponent
   */
  constructor(public DSService: DatasetsService) {
    this.sub = this.DSService.sortSubject.subscribe(_ => {
      this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
    });
  }

  /**
   * @ignore
   *
   * @memberof DatasetsGalleryComponent
   */
  ngOnInit(): void {
    this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
  }

  /**
   * Change sort value
   *
   * @param {*} sortValue
   * @memberof DatasetsGalleryComponent
   */
  sortChanged(sortValue) {
    this.DSService.searchFilters = { field: 'sort', data: sortValue.value ? 'asc' : 'desc', search: true };
  }

  /**
   * Generate gallery view via lightGallery plugin
   *
   * @param {*} index
   * @param {*} el
   * @memberof DatasetsGalleryComponent
   */
  showGallery(index, el) {
    const item = this.datasets[index];
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
