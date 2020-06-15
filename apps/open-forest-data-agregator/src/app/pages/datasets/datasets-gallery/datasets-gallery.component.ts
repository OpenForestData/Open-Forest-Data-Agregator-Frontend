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
export class DatasetsGalleryComponent implements OnInit {
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
