import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetService } from '@app/services/dataset.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ofd-agregator-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  public sortItemsFilter = [
    { name: 'A-Z', value: 0 },
    { name: 'Z-A', value: 1 }
  ];

  public sortItemsType = [
    { name: 'All', value: 0 },
    { name: 'Image', value: 1 },
    { name: 'Video', value: 2 }
  ];

  public sortItemsAccess = [
    { name: 'Public', value: 0 },
    { name: 'Domain', value: 0 }
  ];

  public sortByType = null;
  public sortByAccess = null;
  public sortByFilter = null;

  public optionsType: IUISelectOptions = {
    placeholder: 'Filtruj wg'
  };

  public optionsAccess: IUISelectOptions = {
    placeholder: 'Filtruj wg'
  };

  public optionsFilter: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };

  mockLeftSide: any = {
    downloadAmount: 5,
    dataOpenness: 'Lorem ipsum',
    license: {
      name: 'GNU General Public License',
      link: 'https://pl.wikipedia.org/wiki/GNU_General_Public_License'
    }
  };

  breadCrumbs: IBreadcrumbs[] = [
    { name: 'Start', href: '/' },
    { name: 'Zasoby danych', href: '/datasets' }
  ];

  showOffsets = false;

  pageSize = 15;
  page = 1;
  offset = 2;
  pagesArray = [1, 2, 3];

  mobile = false;

  dataset: any = {};
  urlToDataset: any = '';
  checkboxList = [];
  allFilesCheckboxState = false;
  metricData: any = {};
  sort: any;
  files: any = [];
  metadataObject: any = {};
  allFiles: any = [];

  constructor(private datasetService: DatasetService, private router: Router, private route: ActivatedRoute) {}

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
      this.files = this.dataset.latestVersion.files.map(file => {
        file.isChecked = false;
        return file;
      });
      this.breadCrumbs.push({ name: this.dataset.latestVersion.metadataBlocks.citation.fields[0].value, href: '' });
      this.allFiles = response?.latestVersion?.files.map(x => x);
    });
  }

  /**
   * Function for getting extension from filename
   * @param { string } filename Name of file
   * @example
   * formatConverter('test.abc')
   * // returns abc
   */
  formatConverter(filename: string) {
    let format = filename;
    format = format.substring(format.indexOf('.') + 1);
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
      if (file.isChecked) {
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
    const copyOfInitialFiles = this.dataset.latestVersion?.files.map(x => x);
    this.sort = sort;
    if (sort.value === 0) {
      this.files = copyOfInitialFiles;
    } else if (sort.value === 1) {
      this.files = copyOfInitialFiles.reverse();
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
    const copyOfInitialFiles = this.dataset.latestVersion?.files.map(x => x);
    if (sort.value === 0) {
      this.files = copyOfInitialFiles;
    } else if (sort.value === 1) {
      this.files = copyOfInitialFiles.filter(file => file.dataFile.contentType === 'image/jpeg');
    } else if (sort.value === 2) {
      this.files = copyOfInitialFiles.filter(file => file.dataFile.contentType === 'video/mp4');
    }
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
}
