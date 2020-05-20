import { Component, OnInit } from '@angular/core';

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
    }
  };

  public moreFilters = false;

  constructor() {}

  ngOnInit(): void {}
}
