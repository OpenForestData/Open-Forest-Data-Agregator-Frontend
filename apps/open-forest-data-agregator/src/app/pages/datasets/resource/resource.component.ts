import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { HttpClient } from '@angular/common/http';
import hljs from 'highlight.js';

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

  rdfContent = `
<?xml version="1.0"?> 
<RDF> 
<Description about="http://pl.wikipedia.org/wiki/Filtr_rodzinny"> 
    <autor>Jan Kowalski</autor> 
    <utworzono>1 stycznia 1970</utworzono> 
    <zmodyfikowano>1 stycznia 2000</zmodyfikowano> 
</Description> 
</RDF>`;

  resources: any = [
    {
      format: 'jpg',
      fileLink: 'https://picsum.photos/500/500'
    },
    {
      format: 'txt',
      fileLink: 'https://pastebin.com/raw/Khg3ZhXd'
    },
    {
      format: 'pdf',
      fileLink: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
    },
    {
      format: 'json',
      fileLink: ''
    },
    {
      format: 'csv',
      fileLink: '/assets/.mocks/StoliceSredniki.csv'
    },
    {
      format: 'docx',
      fileLink: 'https://data-epuszcza.biaman.pl/api/access/datafile/223'
    },
    {
      format: 'rdf',
      fileLink: this.rdfContent
    },
    {
      format: 'map',
      fileLink: '/assets/.mocks/small_geojson.geojson'
    }
  ];

  resource = this.resources[7];
  contentText: any = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu augue ut elit porta auctor eget quis nulla.
  Duis mollis scelerisque fermentum. In in laoreet orci. Phasellus at auctor turpis, eu molestie purus. Sed efficitur fermentum velit ac faucibus.
  Aliquam ultrices elementum tincidunt. Etiam quis nibh fermentum, tincidunt erat quis, dignissim felis. Nullam dapibus tincidunt ipsum, non vehicula libero imperdiet ut. Curabitur condimentum magna a neque euismod sollicitudin at et nibh.
  Donec sollicitudin nibh in nisl lacinia elementum. Cras commodo orci lacus, a congue lorem laoreet non. In congue non risus vel ornare.
  Sed rhoncus eget dui sit amet pretium. Nunc nisl magna, sagittis ut ultricies ultrices, accumsan ut felis.
  Sed id elit iaculis, malesuada metus quis, placerat leo. Curabitur porta convallis risus, lobortis mattis odio efficitur sed.`;

  tableViewRaw: any = `{\"NAZWA PLAC\\u00d3WKI\": [\"SP NR 1\", \"SP NR 2\", \"SP NR 6\", \"SP NR 9\", \"SP NR 10\", \"SP NR 11\", \"SP NR 12\", \"SP NR 13\", \"GIM NR 1\", \"GIM NR 2\", \"GIM NR 3\", \"GIM NR 4\"], \"2015 r.\": [6, 0, 3, 5, 15, 2, 6, 6, 11, 18, 21, 13], \"I semestr 2016 r.\": [6, 0, 2, 4, 13, 1, 3, 4, 6, 14, 15, 11], \"II semestr 2016 r.\": [7, 1, 0, 2, 12, 1, 1, 4, 10, 8, 16, 9]}`;
  tableView: any = [JSON.parse(this.tableViewRaw)];
  metaCitation = {
    'download-url': 'https://whiteaster.com',
    MD5: '4b46beba4a79e26745266e2221a09c52',
    'publication-date': '2020-05-20',
    size: '147.9 kB',
    type: 'JPG',
    'deposit-date': '2020-05-20'
  };
  mobile = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (window.screen.width < 1200) {
      this.mobile = true;
    }
    hljs.initHighlightingOnLoad();
  }
}
