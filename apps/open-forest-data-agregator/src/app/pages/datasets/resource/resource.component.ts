import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';

@Component({
  selector: 'ofd-agregator-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  mockLeftSide = {
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
      api: 'http://whiteaster.com'
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

  metaCitation = {
    'download-url': 'https://whiteaster.com',
    MD5: '4b46beba4a79e26745266e2221a09c52',
    'publication-date': '2020-05-20',
    size: '147.9 kB',
    type: 'JPG',
    'deposit-date': '2020-05-20'
  };
  mobile = false;

  constructor() {}

  ngOnInit() {
    if (window.screen.width < 1200) {
      this.mobile = true;
    }
  }
}
