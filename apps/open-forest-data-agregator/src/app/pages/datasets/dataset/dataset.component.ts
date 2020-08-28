import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { ActivatedRoute } from '@angular/router';
import { DatasetsService } from '../datasets.service';

/**
 * Dataset component
 */
@Component({
  selector: 'ofd-agregator-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  /**
   * Sort by name values
   */
  public sortItemsFilter = [
    { name: 'A-Z', value: 0 },
    { name: 'Z-A', value: 1 }
  ];
  /**
   * Sort by type values
   */
  public sortItemsType = [{ name: 'All', value: 0 }];
  /**
   * Sort by filter value
   */
  public sortByType = null;
  /**
   * Sort by filter value
   */
  public sortByFilter = null;
  /**
   * Options type name
   */
  public optionsType: IUISelectOptions = {
    placeholder: 'Filtruj wg'
  };
  /**
   * Options filter name
   */
  public optionsFilter: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };
  /**
   * Mocks
   */
  mockLeftSide: any = {
    downloadAmount: 5,
    dataOpenness: 'Lorem ipsum',
    license: {
      name: 'GNU General Public License',
      link: 'https://pl.wikipedia.org/wiki/GNU_General_Public_License'
    }
  };
  /**
   * List of breadcrumbs
   */
  breadCrumbs: IBreadcrumbs[] = [
    { name: 'Start', href: '/' },
    { name: 'Zasoby danych', href: '/datasets' }
  ];
  /**
   * Pagination size
   */
  pageSize = 15;
  /**
   * Pagination page
   */
  page = 1;
  /**
   * Mobile view
   */
  mobile = false;
  /**
   * Current dataset
   */
  dataset: any = {};
  /**
   * All files checkbox state
   */
  allFilesCheckboxState = false;
  /**
   * Metric data object
   */
  metricData: any = {};
  /**
   * List of files
   */
  files: any = [];
  /**
   * Metadata object
   */
  metadataObject: any = {};
  /**
   * List of all files
   */
  allFiles: any = [];

  /**
   * Dataset constructor
   * @param {DatasetsService} datasetService Dataset Service
   * @param {route} route Route
   */
  constructor(private datasetService: DatasetsService, private route: ActivatedRoute) {}

  /**
   * Function that initialize at the start of website loading. Set mobile/desktop view based on resoultion of window.
   * Convert doi and get dataset details based on DOI
   */
  ngOnInit() {
    if (window.screen.width < 1200) {
      this.mobile = true;
    }
    this.route.queryParams.subscribe((queryParams): any => {
      const doi = atob(queryParams.doi);
      this.getDatasetDetails(doi);
    });
  }

  /**
   * Get Dataset details from backend and translate it to more readable format.
   * @param doi DOI a unique identity from Dataverse
   * @example getDatasetDetails(doi)
   * @returns Observable with details of given doi dataset
   */
  getDatasetDetails(doi) {
    this.datasetService.getDatasetByDOI(doi).subscribe(response => {
      this.dataset = response;
      this.getMetrics(this.dataset);
      this.getFilterTypes();
      this.files = this.dataset.latestVersion.files.map(file => {
        file.isChecked = false;
        return file;
      });
      this.breadCrumbs.push({
        name: this.dataset.search_info.results[0].dvName,
        href: `/datasets?start=0&rows=15&sort=asc&category=${this.dataset.search_info.results[0].identifierOfDataverse}`
      });
      this.breadCrumbs.push({ name: this.dataset.latestVersion.metadataBlocks.citation.fields[0].value, href: '' });
      this.allFiles = [...response?.latestVersion?.files];
    });
  }

  /**
   * Filter all files and get types
   */
  getFilterTypes() {
    if (this.dataset && this.dataset.latestVersion && this.dataset.latestVersion.files) {
      this.dataset.latestVersion.files.forEach((file, index: number) => {
        this.sortItemsType.push({ name: this.formatConverter(file.label), value: index + 1 });
      });
      this.sortItemsType = this.sortItemsType.filter(
        (elem, index, self) => self.findIndex(temp => temp.name === elem.name) === index
      );
    }
  }

  /**
   * Function for getting extension from filename
   * @param { string } filename Name of file
   * @example
   * formatConverter('test.abc')
   * // returns abc
   */
  formatConverter(filename: string): string {
    let format = filename;
    format = format.substr(format.lastIndexOf('.') + 1).toUpperCase();
    return format;
  }

  /**
   * Opens a new window with given link that downloads file
   * @param file File
   * @example
   * // returns
   * downloadSingleResource(file.download_url)
   */
  downloadSingleResource(file: any) {
    return window.open(file, '_blank');
  }

  /**
   * Give a property isChecked to a file list
   */
  toggleAllCheckboxes() {
    this.allFilesCheckboxState = !this.allFilesCheckboxState;
    this.files = this.files.map(file => {
      file.isChecked = this.allFilesCheckboxState;
      return file;
    });
  }

  /**
   * Check if checkbox are checked and downloads files if are
   */
  downloadCheckedFiles() {
    this.dataset.latestVersion.files.forEach(file => {
      if (file.isChecked && !file.restricted) {
        this.downloadSingleResource(file.download_url);
      }
    });
  }

  /**
   * Translate resource list into more readable object
   * @param resource Resource list
   * @example
   * getMetrics(this.dataset)
   * // returns Object with key : value
   */
  getMetrics(resource) {
    resource.latestVersion?.metadataBlocks?.citation.fields.forEach(field => {
      this.metricData[field.typeName] = field;
    });
  }

  /**
   * Take a alternative link if exists and return it if not then make a link to dataset based on dataset details
   * @returns { string } URL to dataset or other resource where the file exists
   * @example
   * makeSource()
   * // returns https://data-epuszcza.biaman.pl/dataset.xhtml?persistentId=doi:10.5072/FK2/HAS4WC
   */
  makeSource() {
    if (this.dataset?.alternativeURL) {
      return this.dataset?.alternativeURL;
    } else {
      return `https://data-epuszcza.biaman.pl/dataset.xhtml?persistentId=${this.dataset.latestVersion?.datasetPersistentId}`;
    }
  }

  /**
   * Sorting files based on sorting value
   * @param sort Sorting value
   * @example
   * onSortChange(1)
   * // returns list of files in order by name Z-A
   */
  onSortChange(sort) {
    const copyOfInitialFiles = [...this.dataset.latestVersion?.files];
    if (sort.value === 0) {
      this.files = copyOfInitialFiles;
    } else if (sort.value === 1) {
      this.files = [...copyOfInitialFiles].reverse();
    }
  }

  /**
   * Sorting types function based on sorting value
   * @param sort Sorting value
   * @example
   * onSortTypeChange(0)
   * // returns List of all files
   */
  onSortTypeChange(sort) {
    const copyOfInitialFiles = [...this.dataset.latestVersion?.files];
    this.files =
      sort.value === 0
        ? copyOfInitialFiles
        : copyOfInitialFiles.filter(file => this.formatConverter(file.label) === sort.name);
  }

  /**
   * Concat data from converted metadata object into csv file and downloads it new window
   * @param data Metadata object
   * @example
   * convertMetadataToFile(getMetadata(dataset?.latestVersion?.metadataBlocks))
   */
  convertMetadataToFile(data: any) {
    let firstRow = '';
    let secondRow = '';
    Object.keys(data).forEach(first => {
      firstRow += first + ';';
    });
    Object.values(data).forEach(second => {
      secondRow += second + ';';
    });
    const csvArray = [firstRow, '\r\n', secondRow];

    const a = document.createElement('a');
    const blob = new Blob(csvArray, { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = `${this.dataset.latestVersion?.metadataBlocks?.citation?.fields[0]?.value}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * Convert metadata from backend and convert it to more readable object
   * @param metadata
   * @example getMetadata(dataset?.latestVersion?.metadataBlocks)
   * @returns Object with metadata with fields in form of key : value
   */
  getMetadata(metadata) {
    Object.values(metadata).forEach((meta: any) => {
      meta?.fields.forEach(field => {
        if (field.multiple === true) {
          if (field.typeName === 'subject') {
            this.metadataObject[field.typeName] = field.value[0];
          } else if (field.typeName !== 'subject') {
            field.value.forEach(value => {
              Object.values(value).forEach((val: any) => {
                this.metadataObject[val.typeName] = val.value;
              });
            });
          }
        } else if (field.multiple === false) {
          this.metadataObject[field.typeName] = field.value;
        }
      });
    });
    return this.metadataObject;
  }

  /**
   * Pagination function for list of files on change trigger
   * @param payload Payload
   */
  paginationChange(payload) {
    this.files = this.allFiles.slice(payload.page * payload.limit - payload.limit, payload.page * payload.limit);
  }

  typeOf(value) {
    return typeof value;
  }
}
