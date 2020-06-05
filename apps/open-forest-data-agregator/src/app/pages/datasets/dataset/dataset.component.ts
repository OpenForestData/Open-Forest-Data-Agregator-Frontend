import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';

@Component({
  selector: 'ofd-agregator-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  public sortItemsFilter = [
    { name: 'A-Z', value: 0 },
    { name: 'Z-A', value: 0 }
  ];

  public sortItemsType = [
    { name: 'Image', value: 0 },
    { name: 'Video', value: 0 }
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

  metaDarwin: object = {
    type: 'Psycial Object',
    license: 'CC BY',
    'rights-holder': 'Mammal Research Institute Polish Academy of Science',
    'institution-code': 'MRIPAS',
    'collection-code': 'ZOO',
    'dataset-name': 'Kolekcja zoologiczna IBS PAN',
    'basis-of-record': 'Organism',
    'catalog-number': 'Catalog Number: 59681',
    sex: 'female',
    'life-stage': 'adult',
    event: '1997-07-16',
    year: 'Year: 1990',
    month: 'Month: 7',
    day: 'Day: 16',
    continent: 'Europe',
    country: 'Poland',
    locality: 'Białowieża BPN I3-I4-250',
    latitude: '52.222222',
    longtiude: '23.880547',
    'latina-title': 'Mustela nivalis'
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
  constructor() {}

  ngOnInit() {
    if (window.screen.width < 1200) {
      this.mobile = true;
    }
  }

  pageClick(page) {}
}
