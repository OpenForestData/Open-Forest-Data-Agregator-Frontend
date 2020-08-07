import { Component, OnInit } from '@angular/core';
import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatasetsService } from '../datasets.service';

/**
 * Resource component
 */
@Component({
  selector: 'ofd-agregator-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  /**
   * Single resource
   */
  resource: any = [];
  /**
   * Content of resource
   */
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
  /**
   * Viewer type
   */
  viewerType = '';
  /**
   * Metric data object
   */
  metricData: any = {};
  /**
   * @ignore
   *
   * @memberof ResourceComponent
   */
  mockLeftSide = {
    downloadAmount: 5,
    source: {
      type: 'Dataverse',
      link: 'https://data-epuszcza.biaman.pl/dataset.xhtml?persistentId=doi:10.5072/FK2/UGMKHW'
    },
    author: 'Olga Kurek',
    dataOpenness: '',
    license: {
      name: 'GNU General Public License',
      link: 'https://pl.wikipedia.org/wiki/GNU_General_Public_License'
    },
    version: {
      number: '0.1',
      date: new Date(),
      acceptedBy: 'Olga Kurek',
      link: 'https://whiteaster.com/'
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
   * Meta citation object
   */
  metaCitation = {
    'download-url': '',
    MD5: '',
    'publication-date': '',
    size: '',
    type: '',
    'deposit-date': null
  };
  /**
   * Mobile view
   */
  mobile = false;

  /**
   * Resource constructor
   * @param {HttpClient} http Http
   * @param {DatasetsService} datasetService Dataset Service
   * @param {ActivatedRoute} route Route
   */
  constructor(private http: HttpClient, private datasetService: DatasetsService, private route: ActivatedRoute) {}
  /**
   * Function that initialize at the start of website loading. Set mobile/desktop view based on resoultion of window.
   * Convert doi and get dataset details based on DOI
   */
  ngOnInit() {
    if (window.screen.width < 1200) {
      this.mobile = true;
    }
    this.getResourceByID(this.route.snapshot.paramMap.get('id'));
  }

  /**
   * Get resource file from backend, format metric, and feed resource view components based on type
   * @param id ID of resource file
   */
  getResourceByID(id: any) {
    this.datasetService.getResourceByID(id).subscribe(response => {
      this.resource = response;
      this.getMetrics(this.resource);
      this.getMetadataOfFile(this.resource);
      this.breadCrumbs.push({ name: this.resource?.dataset_details?.providers[0]?.authorAffiliation?.value, href: '' });
      this.breadCrumbs.push({
        name: this.resource?.dataset_details?.latestVersion.metadataBlocks.citation.fields[0].value,
        href: ''
      });
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
        ['Comma Separated Values', 'Tab-Separated Values', 'Tab-Delimited'].indexOf(
          this.resource.details?.fileTypeDisplay
        ) >= 0
      ) {
        this.resourceContent.csv = this.resource.download_url;
      } else if (['application/x-abiword', 'map_geonode'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'geonodeViewer';
      } else if (
        ['application/vnd.apple.installer+xml', 'dashboard_grafana'].indexOf(this.resource.details?.fileTypeDisplay) >=
        0
      ) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'grafanaViewer';
      } else if (
        ['image/x-3ds', 'application/x-tgif', 'application/vnd.ms-pki.stl'].indexOf(
          this.resource.details?.fileTypeDisplay
        ) >= 0
      ) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = '3dViewer';
      } else if (['application/x-shockwave-flash', 'micro'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'microViewer';
      } else if (['TIFF Image'].indexOf(this.resource.details?.fileTypeDisplay) >= 0) {
        this.resourceContent.iframe = this.resource;
        this.viewerType = 'tiffViewer';
      } else if (
        ['application/geo+json', 'application/vnd.google-earth.kml+xml', 'wkt', 'Shape'].indexOf(
          this.resource.details?.fileTypeDisplay
        ) >= 0
      ) {
        this.resourceContent.map = this.resource.download_url;
      }
    });
  }

  /**
   * Get file content from given URL
   * @param url URL to file
   */
  getTextFromURL(url: string) {
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      this.resourceContent.plain_text = response;
    });
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
   * Convert resource object to single object in simplified form for display
   * @param resource Resource object
   */
  getMetrics(resource) {
    resource.dataset_details?.latestVersion?.metadataBlocks?.citation.fields.forEach(field => {
      this.metricData[field.typeName] = field;
    });
  }

  /**
   * Function that keep sorting in keyvalue angular pipe
   * @param a Sorting value a
   * @param b Sorting value b
   */
  keepOrder = (a, b) => {
    return a;
  };

  /**
   * Creates new object with file metadata
   * @param resource Resource file details
   */
  getMetadataOfFile(resource) {
    this.metaCitation = {
      'download-url': resource.download_url,
      MD5: resource.details.fileMd5,
      'publication-date': resource.details.publicationDate,
      size: this.convertFromBytes(resource.details.fileSizeInBytes),
      type: resource.details.fileTypeDisplay,
      'deposit-date': new Date(resource.details.dateSort)
    };
  }

  /**
   * Transform bytes into kilobytes
   * @param size Size of file in bytes
   * @returns { string } Size file in kilobytes
   * @example
   * convertFromBytes(1000)
   * // returns '1 kB'
   */
  convertFromBytes(size): string {
    return Math.floor(size / 1024).toString() + ' kB';
  }

  /**
   * Take a alternative link if exists and return it if not then make a link to dataset based on dataset details
   * @returns { string } URL to dataset or other resource where the file exists
   * @example
   * makeSource()
   * // returns https://data-epuszcza.biaman.pl/file.xhtml?fileId=73&version=1.0
   */
  makeSource() {
    if (this.resource.detaset_details?.alternativeURL) {
      return this.resource.dataset_details?.alternativeURL;
    } else {
      return `https://data-epuszcza.biaman.pl/file.xhtml?fileId=${this.resource.details?.identifier}&version=${this.resource.dataset_details?.latestVersion.versionNumber}.0`;
    }
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
    if (format) {
      format = format.substr(format.lastIndexOf('.') + 1);
      return format;
    }
  }
}
