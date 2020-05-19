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
      data: [
        { name: 'Test #1', value: 1 },
        { name: 'Test #2', value: 2 },
        { name: 'Test #3', value: 3 }
      ]
    },
    format: {
      isExpanded: false,
      key: 'format',
      value: [],
      data: [
        { name: 'Test #1', value: 1 },
        { name: 'Test #2', value: 2 },
        { name: 'Test #3', value: 3 }
      ]
    },
    type: {
      isExpanded: false,
      key: 'type',
      value: [],
      data: [
        { name: 'Test #1', value: 1 },
        { name: 'Test #2', value: 2 },
        { name: 'Test #3', value: 3 }
      ]
    }
  };

  constructor() {}

  ngOnInit(): void {}
}
