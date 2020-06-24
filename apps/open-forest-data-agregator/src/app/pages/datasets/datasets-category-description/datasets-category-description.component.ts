import { Component, OnInit } from '@angular/core';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-category-description',
  templateUrl: './datasets-category-description.component.html',
  styleUrls: ['./datasets-category-description.component.scss']
})
export class DatasetsCategoryDescriptionComponent implements OnInit {
  constructor(public DSService: DatasetsService) {}

  public get category() {
    return this.DSService.searchFilters.data['category'];
  }

  public get data() {
    try {
      return this.DSService.searchData['list']['categories_descriptions'][this.category];
    } catch (e) {
      return {};
    }
  }

  ngOnInit() {}
}
