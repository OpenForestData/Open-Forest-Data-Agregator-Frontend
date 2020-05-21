import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import 'lightgallery.js';
import 'lg-zoom.js';
import 'lg-autoplay.js';
import 'lg-fullscreen.js';
import 'lg-thumbnail.js';

import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';

@Component({
  selector: 'ofd-agregator-datasets-gallery',
  templateUrl: './datasets-gallery.component.html',
  styleUrls: ['./datasets-gallery.component.scss']
})
export class DatasetsGalleryComponent implements OnInit, AfterViewInit {
  /*
   * MOCK
   */
  public page = 1;

  public sortItems = [
    { name: 'A-Z', value: 0 },
    { name: 'Z-A', value: 0 }
  ];

  public sortBy = null;

  public options: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };

  @Input() datasets: any[];

  @ViewChild('galleryItems', { static: false }) galleryItems: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      // @ts-ignore
      window.lightGallery(document.querySelector('.datasets-list__datasets'), {
        selector: '.datasets-list__datasets__item__picture'
      });
    }, 0);
  }
}
