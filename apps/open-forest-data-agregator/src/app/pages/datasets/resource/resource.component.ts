import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { HttpClient } from '@angular/common/http';
import hljs from 'highlight.js';
import { DatasetService } from '@app/services/dataset.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ofd-agregator-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  resource: any = [];
  resourceContent = {
    plain_text: '',
    image: null,
    pdf: null,
    json: null,
    csv: null,
    doc: null
  };
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
      format: 'csv',
      fileLink: '/assets/.mocks/StoliceSredniki.csv'
    },
    {
      format: 'docx',
      fileLink: 'https://data-epuszcza.biaman.pl/api/access/datafile/223'
    },
    {
      format: 'geojson',
      fileLink: '/assets/.mocks/small_geojson.geojson'
    },
    {
      format: 'geotiff',
      fileLink: '/assets/.mocks/cea.tif'
    },
    {
      format: 'kml',
      fileLink: '/assets/.mocks/kml_example.kml'
    },
    {
      format: 'geotiff',
      fileLink: '/assets/.mocks/example_4269.tif'
    },
    {
      format: 'wkt',
      fileLink: '/assets/.mocks/geometry.wkt'
    },
    {
      format: 'gml',
      fileLink: '/assets/.mocks/gml2.gml'
    },
    {
      format: 'shp',
      fileLink: '/assets/.mocks/gis_osm_water_a_07_1.shp'
    },
    {
      format: '3d',
      fileLink: `https://externaltools.whiteaster.com/tools/3dViewer.html?siteUrl=https://openforestdata.pl&fileid=43&datasetid=41&datasetversion=1.0`
    },
    {
      format: 'tiff',
      fileLink: `https://data-epuszcza.biaman.pl/tools/tiffViewer.html?siteUrl=https://data-epuszcza.biaman.pl/&fileid=217&datasetid=206&datasetversion=2.1`
    }
  ];

  // resource = this.resources[14];
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

  externalTools = `
3d: https://externaltools.whiteaster.com/tools/3dViewer.html?siteUrl=https://openforestdata.pl&fileid=43&datasetid=41&datasetversion=1.0
Micro: https://data-epuszcza.biaman.pl/tools/microViewer.html?siteUrl=https://openforestdata.pl&fileid=43&datasetid=41&datasetversion=1.0
Tiff: https://data-epuszcza.biaman.pl/tools/tiffViewer.html?siteUrl=https://data-epuszcza.biaman.pl/&fileid=217&datasetid=206&datasetversion=2.1
Geonode: https://data-epuszcza.biaman.pl/tools/geonodeViewer.html?siteUrl=https://data-epuszcza.biaman.pl/&fileid=232&datasetid=231&datasetversion=1.0
Grafana: https://data-epuszcza.biaman.pl/tools/grafanaViewer.html?siteUrl=https://data-epuszcza.biaman.pl/&fileid=237&datasetid=236&datasetversion=1.0
  `;

  externalToolExplanation = `
  EXTERNAL_URL to adres strony ggdzie są external toole, to chyba będzie statyczne albo przekazane przez Olka
  potem masz typ external toola (3dViewer, microViewer itp...)
  to będziesz musiał wstawiać w zależności od typu pliku
  stale: SITE_URL, FILE_ID, DATASET_ID i DATASET_VERSION
  będziesz musiał wyciągnąć sobie od Olka
  SITE_URL to adres datavers'a
  FILE_ID to ID pliku
  DATASET_ID to id datasetu (nie DOI!!!!!)
  DATASET_VERSION to wersja datasetu (1.0, 1.1 itp. nie ID wersji a wersja)
  `;

  constructor(private http: HttpClient, private datasetService: DatasetService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (window.screen.width < 1200) {
      this.mobile = true;
    }
    this.getResourceByID(this.route.snapshot.paramMap.get('id'));
  }

  getResourceByID(id: any) {
    this.datasetService.getResourceByID(id).subscribe(response => {
      this.resource = response;
      console.log('TYPE: ', this.resource.details.fileTypeDisplay);
      console.log('this.resource: ', this.resource);
      if (this.resource.details.fileTypeDisplay === 'Plain Text') {
        this.getTextFromURL(this.resource.download_url);
      } else if (this.resource.details.fileTypeDisplay === 'JPEG Image') {
        this.resourceContent.image = this.resource.download_url;
      } else if (this.resource.details.fileTypeDisplay === 'Adobe PDF') {
        this.resourceContent.pdf = this.resource.download_url;
      } else if (this.resource.details.fileTypeDisplay === 'JSON') {
        this.getTextFromURL(this.resource.download_url);
      } else if (this.resource.details.fileTypeDisplay === 'application/rdf+xml') {
        this.getTextFromURL(this.resource.download_url);
      } else if (this.resource.details.fileTypeDisplay === 'Comma Separated Values') {
        this.resourceContent.csv = this.resource.download_url;
      } else if (this.resource.details.fileTypeDisplay === 'MS Word') {
        this.resourceContent.doc = 'https://data-epuszcza.biaman.pl/api/access/datafile/223';
        // this.resourceContent.doc = this.resource.download_url;
        // STATIC LINK BECAUSE OUR DATAVERSE IS NOT VISIBLE OUTSIDE OUR NETWORK
      }
    });
  }

  getTextFromURL(url: string) {
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      this.resourceContent.plain_text = response;
      console.log('test: ', this.resourceContent.plain_text);
    });
  }
}
