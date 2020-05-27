import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { categoriesMock } from '@app/pages/datasets/datasets.mock';

@Component({
  selector: 'ofd-agregator-datasets-filters',
  templateUrl: './datasets-filters.component.html',
  styleUrls: ['./datasets-filters.component.scss']
})
export class DatasetsFiltersComponent implements OnInit {
  public filters = {
    media: {
      key: 'media',
      value: false
    },
    coordinates: {
      key: 'coordinates',
      value: false
    },
    organization: {
      isExpanded: false,
      key: 'organization',
      value: [],
      multiple: true,
      data: new Array(10).fill(0).map((value, i) => {
        return { name: 'Test #' + ++i, value: ++i };
      })
    },
    format: {
      isExpanded: false,
      key: 'format',
      value: [],
      multiple: true,
      data: new Array(10).fill(0).map((value, i) => {
        return { name: 'Test #' + ++i, value: ++i };
      })
    },
    type: {
      isExpanded: false,
      key: 'type',
      value: [],
      multiple: true,
      data: new Array(10).fill(0).map((value, i) => {
        return { name: 'Test #' + ++i, value: ++i };
      })
    },
    license: {
      isExpanded: false,
      key: 'license',
      value: [],
      multiple: true,
      data: new Array(10).fill(0).map((value, i) => {
        return { name: 'Test #' + ++i, value: ++i };
      })
    },
    species: {
      isExpanded: false,
      key: 'species',
      value: [],
      multiple: true,
      data: new Array(10).fill(0).map((value, i) => {
        return { name: 'Test #' + ++i, value: ++i };
      })
    },
    gender: {
      isExpanded: false,
      key: 'gender',
      value: [],
      multiple: true,
      data: new Array(10).fill(0).map((value, i) => {
        return { name: 'Test #' + ++i, value: ++i };
      })
    },
    keywords: {
      isExpanded: false,
      key: 'keywords',
      value: null,
      multiple: false,
      data: new Array(10).fill(0).map((value, i) => {
        return { name: 'Test #' + ++i, value: ++i };
      })
    },
    createdYear: {
      isExpanded: false,
      key: 'created-year',
      value: null,
      multiple: false,
      data: [
        { name: '2020', value: 2020 },
        { name: '2016', value: 2016 },
        { name: '2012', value: 2012 }
      ]
    },
    author: {
      isExpanded: false,
      key: 'author',
      value: null,
      multiple: false,
      data: [{ name: 'Kurek Olga', value: 1 }]
    },
    range: {
      isExpanded: false,
      key: 'range',
      value: null,
      multiple: false,
      data: []
    },
    timeRange: {
      isExpanded: false,
      key: 'time-range',
      value: { from: '', to: '' },
      data: null
    },
    categories: {
      isExpanded: false,
      key: 'category',
      value: null,
      multiple: false,
      data: categoriesMock
    }
  };

  public moreFilters = false;

  public isMobile = false;

  // tslint:disable-next-line
  @Output() onDisplayModeChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkMobile();
  }

  constructor() {}

  ngOnInit(): void {
    this.checkMobile();
  }

  checkMobile() {
    if (this.isMobile !== window.innerWidth <= 1200) {
      this.isMobile = window.innerWidth <= 1200;
      this.moreFilters = this.isMobile;

      this.onDisplayModeChange.emit(this.isMobile ? 'mobile' : 'desktop');
    }
  }
}
