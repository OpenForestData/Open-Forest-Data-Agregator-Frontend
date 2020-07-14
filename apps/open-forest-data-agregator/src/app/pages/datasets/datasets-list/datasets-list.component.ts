import { Component, Input, OnDestroy } from '@angular/core';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetsService } from '../datasets.service';
import { Subscription } from 'rxjs';
/**
 * Datasets as list
 *
 * @export
 * @class DatasetsListComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.scss']
})
export class DatasetsListComponent implements OnDestroy {
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

  columnKeys: any = [];

  /**
   * Sort value change callback
   *
   * @param {*} sortValue
   * @memberof DatasetsListComponent
   */
  sortChanged(sortValue) {
    this.DSService.searchFilters = { field: 'sort', data: sortValue.value ? 'asc' : 'desc', search: true };
  }

  /**
   * Creates an instance of DatasetsListComponent.
   * @param {DatasetsService} DSService
   * @memberof DatasetsListComponent
   */
  constructor(public DSService: DatasetsService) {
    this.sub = this.DSService.sortSubject.subscribe(_ => {
      this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
    });
  }

  /**
   * @ignore
   *
   * @memberof DatasetsListComponent
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMetadata() {
    this.DSService.getMetadata().subscribe(response => {
      Object.values(response).forEach((value: any) => {
        this.columnKeys = [...this.columnKeys, ...Object.keys(value.fields)];
      });
      this.getData();
    });
  }

  getData() {
    const allMetadata = [];
    this.DSService.searchFilters = { field: 'start', data: 1, search: true };
    this.DSService.searchFilters = { field: 'rows', data: 1000, search: true };
    this.DSService.search().subscribe((response: any) => {
      this.DSService.searchData = response;
      const identifiers = [];
      const identifiersIndex = {};

      response['list']['results'].map((item, index) => {
        identifiers.push(item.identifier);
        identifiersIndex[item.identifier] = index;

        return {
          datasetPersistentID: item.dsPersistentId
        };
      });
      this.DSService.searchFilters = { field: 'start', data: 1, search: true };
      this.DSService.searchFilters = { field: 'rows', data: 15, search: true };

      if (identifiers.length) {
        this.DSService.details(identifiers).subscribe((details: any) => {
          Object.values(details).forEach((singleDataset: any) => {
            allMetadata.push(this.convertMetadata(singleDataset?.latestVersion?.metadataBlocks));
          });
          this.convertMetadataToFile(this.columnKeys, allMetadata);
        });
      }
    });
  }

  convertMetadataToFile(keys: any, allMetadata) {
    let firstRow = '';
    const indexer = {};
    let temp = [];
    let row = '';
    keys.forEach((first, index) => {
      firstRow += first + ';';
      indexer[first] = index;
    });
    const csvArray: any = [firstRow];
    Object.values(allMetadata).forEach(meta => {
      temp = [];
      Object.keys(meta).forEach((key: any) => {
        temp[indexer[key]] = meta[key];
      });
      csvArray.push('\r\n');
      row = temp.join(';');
      csvArray.push(row);
    });

    const a = document.createElement('a');
    const blob = new Blob(csvArray, { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = `Metadane.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  convertMetadata(metadata) {
    const metadataObject = {};
    Object.values(metadata).forEach((meta: any) => {
      meta?.fields.forEach(field => {
        if (field.multiple === true) {
          if (field.typeName === 'subject') {
            metadataObject[field.typeName] = field.value[0];
          } else if (field.typeName !== 'subject') {
            field.value.forEach(value => {
              Object.values(value).forEach((val: any) => {
                metadataObject[val.typeName] = val.value;
              });
            });
          }
        } else if (field.multiple === false) {
          metadataObject[field.typeName] = field.value;
        }
      });
    });
    return metadataObject;
  }
}
