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
    doc: null,
    map: null,
    iframe: null
  };
  viewerType = '';
  metricData: any = {};
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

  resources: any = [
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
      this.getMetrics(this.resource);
      this.getMetadataOfFile(this.resource);
      // this.metricData = this.resource.detaset_details?.lastestVersion?.metadataBlocks.citation;
      if (['Plain Text'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.getTextFromURL(this.resource.download_url);
      } else if (['MS Word', 'MS Excel Spreadsheet'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.doc = this.resource.download_url;
      } else if (['JPEG Image', 'PNG Image', 'GIF Image'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.image = this.resource.download_url;
      } else if (['Adobe PDF'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.pdf = this.resource.download_url;
      } else if (['JSON'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.getTextFromURL(this.resource.download_url);
      } else if (['application/rdf+xml', 'XML'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.getTextFromURL(this.resource.download_url);
      } else if (
        ['Comma Separated Values', 'Tab-Separated Values'].indexOf(this.resource.details?.fileTypeDisplay) >= 0
      ) {
        this.resourceContent.csv = this.resource.download_url;
      } else if (['map_geonode'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'geonodeViewer';
      } else if (['dashboard_grafana'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'grafanaViewer';
      } else if (
        ['3ds', 'application/x-tgif', 'application/vnd.ms-pki.stl'].indexOf(this.resource.details?.fileTypeDisplay) >= 0
      ) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = '3dViewer';
      } else if (['micro'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'microViewer';
      } else if (['TIFF Image'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'tiffViewer';
      } else if (
        ['application/geo+json', 'application/vnd.google-earth.kml+xml', 'wkt'].indexOf(
          this.resource.details?.fileTypeDisplay
        ) >= 0
      ) {
        this.resourceContent.map = this.resource.download_url;
      } else {
        console.log('GET RESOURCE BY ID ELSE BLOCK');
      }
      console.log('resource content: ', this.resourceContent);
    });
  }

  getTextFromURL(url: string) {
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      this.resourceContent.plain_text = response;
      console.log('test: ', this.resourceContent.plain_text);
    });
  }

  getJSONFromURL(url: string) {
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      this.resourceContent.iframe = JSON.parse(response);
    });
  }

  downloadSingleResource(file: any) {
    return window.open(file, '_blank');
  }

  getMetrics(resource) {
    resource.dataset_details?.latestVersion?.metadataBlocks?.citation.fields.forEach(field => {
      // console.log(field);
      this.metricData[field.typeName] = field;
    });
    console.log('metric data: ', this.metricData);
  }

  keepOrder = (a, b) => {
    return a;
  };

  getMetadataOfFile(resource) {
    this.metaCitation = {
      'download-url': resource.download_url,
      MD5: resource.details.fileMd5,
      'publication-date': resource.details.publicationDate,
      size: this.convertFromBytes(resource.details.fileSizeInBytes),
      type: resource.details.fileTypeDisplay,
      'deposit-date': resource.details.dateSort
    };
  }

  convertFromBytes(size): string {
    return Math.floor(size / 1024).toString() + ' kB';
  }
}
