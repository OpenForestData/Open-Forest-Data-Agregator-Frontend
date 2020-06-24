import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import 'lightgallery.js';
import 'lg-zoom.js';
import 'lg-autoplay.js';
import 'lg-fullscreen.js';
import 'lg-thumbnail.js';

import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-gallery',
  templateUrl: './datasets-gallery.component.html',
  styleUrls: ['./datasets-gallery.component.scss']
})
export class DatasetsGalleryComponent implements OnInit {
  public sortItems = [
    { name: 'A-Z', value: 1 },
    { name: 'Z-A', value: 0 }
  ];

  public sortBy = this.sortItems[0];

  public options: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };

  @Input() datasets: any[];

  @ViewChild('galleryItems', { static: false }) galleryItems: any;

  constructor(public DSService: DatasetsService) {}

  ngOnInit(): void {
    this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
  }

  sortChanged(sortValue) {
    this.DSService.searchFilters = { field: 'sort', data: sortValue.value ? 'asc' : 'desc' };
  }

  showGallery(index, el) {
    const item = this.datasets[index];
    const dynamicEl = item.images.map((img, imgIndex) =>
      Object.create({
        src: img,
        thumb: img,
        subHtml: `Dataset - ${index}, Img: ${imgIndex}`
      })
    );

    // @ts-ignore
    window.lightGallery(el, {
      dynamic: true,
      dynamicEl
    });
  }
}
