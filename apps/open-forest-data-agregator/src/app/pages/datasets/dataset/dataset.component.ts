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
    placeholder: 'Sortuj wg'
  };

  public optionsFilter: IUISelectOptions = {
    placeholder: 'Filtruj wg'
  };

  mockLeftSide: any = {
    downloadAmount: 5,
    createdDate: '20.07.2019',
    source: {
      type: 'Dataverse',
      link: 'https://data-epuszcza.biaman.pl/dataset.xhtml?persistentId=doi:10.5072/FK2/UGMKHW'
    },
    author: 'Olga Kurek',
    dataOpenness: 'Lorem ipsum',
    license: {
      name: 'GNU General Public License',
      link: 'https://pl.wikipedia.org/wiki/GNU_General_Public_License'
    },
    subjects: ['Medicine', 'Health and Life', 'Sciences'],
    keywords: ['mammal', 'wolf', 'mustela common random lorem'],
    version: {
      number: '0.1',
      date: new Date(),
      acceptedBy: 'Olga Kurek',
      link: 'https://whiteaster.com/'
    }
  };

  breadCrumbs: IBreadcrumbs[] = [
    { name: 'Start', href: '/' },
    { name: 'Zasoby danych', href: '/datasets' }
  ];

  testData = {
    header: {
      title: 'Jam Łasica(Pawian Pospolity)',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Mauris vitae magna sodales, dapibus metus quis, scelerisque nulla. Maecenas nec orci at dui l`,
      api: 'http://whiteaster.com',
      apiUrl: 'http://whiteaster.com'
    },
    body: {
      name: 'abc'
    },
    files: [
      {
        title: 'DataViewer - MRIPAS_coll_159681_Mustela  Nivalis_ Xray__IR_rec00000157.bmp 2020-03-30 10-01-40.mp4',
        format: 'mp4',
        link: 'https://whiteaster.com'
      },
      {
        title: 'MRIPAS_coll_159681_MustelaNivalis_1990_scan.jpg',
        format: 'jpg',
        link: 'https://whiteaster.com'
      },
      {
        title: 'MRIPAS_coll_23624_MustelaNivalis_xray.zip',
        format: 'zip',
        link: 'https://whiteaster.com'
      }
    ]
  };

  metaCitation: object = {
    id: 1,
    'publication-date': '2020-05-21',
    title: 'Jam Łasica(Pawian Pospolity)',
    author: 'Olga Kurek',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Mauris vitae magna sodales, dapibus metus quis, scelerisque nulla. Maecenas nec orci at dui l`,
    subject: 'Medicine, Science, Test',
    keyword: 'Medicine, Science, Test',
    depositor: 'Kurek, Olga',
    'deposit-date': '2020-05-21'
  };

  showOffsets = false;

  pages = 3;
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

  constructor(private datasetService: DatasetService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (window.screen.width < 1200) {
      this.mobile = true;
    }
    this.route.queryParams.subscribe((queryParams): any => {
      const doi = atob(queryParams.doi);
      this.getDatasetDetails(doi);
    });
  }

  pageClick(page) {}

  getDatasetDetails(doi) {
    this.datasetService.getDatasetByDOI(doi).subscribe(response => {
      this.dataset = response;
      this.getMetrics(this.dataset);
      this.files = this.dataset.latestVersion.files.map(file => {
        file.isChecked = false;
        return file;
      });
      this.breadCrumbs.push({ name: this.dataset.latestVersion.metadataBlocks.citation.fields[0].value, href: '' });
      console.log('dataset: ', this.dataset);
    });
  }

  formatConverter(filename: string) {
    let format = filename;
    format = format.substring(format.indexOf('.') + 1);
    return format;
  }

  downloadSingleResource(file: any) {
    return window.open(file, '_blank');
  }

  toggleAllCheckboxes() {
    this.allFilesCheckboxState = !this.allFilesCheckboxState;
    this.dataset.latestVersion.files = this.dataset.latestVersion.files.map(file => {
      file.isChecked = this.allFilesCheckboxState;
      return file;
    });
  }

  downloadCheckedFiles() {
    this.dataset.latestVersion.files.forEach(file => {
      if (file.isChecked) {
        this.downloadSingleResource(file.download_url);
      }
    });
  }

  getMetrics(resource) {
    resource.latestVersion?.metadataBlocks?.citation.fields.forEach(field => {
      this.metricData[field.typeName] = field;
    });
  }

  makeSource() {
    if (this.dataset?.alternativeURL) {
      return this.dataset?.alternativeURL;
    } else {
      return `https://data-epuszcza.biaman.pl/dataset.xhtml?persistentId=${this.dataset.latestVersion?.datasetPersistentId}`;
    }
  }

  sortByName() {
    this.dataset?.latestVersion?.files.reverse();
    return this.dataset?.latestVersion?.files;
  }

  onSortChange(sort) {
    const copyOfInitialFiles = this.dataset.latestVersion?.files.map(x => x);
    this.sort = sort;
    if (sort.value === 0) {
      this.files = copyOfInitialFiles;
    } else if (sort.value === 1) {
      this.files = copyOfInitialFiles.reverse();
    }
  }

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
}
