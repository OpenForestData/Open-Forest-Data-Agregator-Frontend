import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LanguageService } from './language.service';
import { Subject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { LoaderService } from './loader.service';

/**
 * Interface for navigation items
 *
 * @interface NavigationItem
 */
export interface NavigationItem {
  /**
   * Navigation item name
   */
  name: string;
  /**
   * Path
   */
  path: string;
  /**
   * Unique navigation item key
   */
  key: string;
  /**
   * Navigation item URL
   */
  url?: string;
  /**
   * Children of item
   */
  children?: NavigationItem[];
  /**
   * Browser target eq _blank
   */
  target?: string;
}

/**
 * Utility service with useful data and functions
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  /**
   * Sends information about menu being
   */
  public menuReadySubject: Subject<any> = new Subject();

  /**
   * Holds data from API
   */
  public homePageData;

  /**
   * Defines whatever menu structure has been created
   *
   * @memberof UtilsService
   */
  public structureCreated = false;

  /**
   * Menu basic structure
   */
  private basicStructure: NavigationItem[] = [
    {
      name: 'nav.items.start',
      path: '/',
      key: 'start'
    },
    {
      name: 'nav.items.datasets',
      path: '/datasets',
      key: 'datasets'
    },
    {
      name: 'nav.items.stats',
      path: '/statistics',
      key: 'stats'
    },
    {
      name: 'nav.items.mobile-application',
      path: 'https://bioloc.biaman.pl/',
      key: 'mobile-application',
      target: '_blank'
    }
  ];

  /**
   * Menu Structure
   */
  private _menuStructure: NavigationItem[] = [
    {
      name: 'nav.items.start',
      path: '/',
      key: 'start'
    },
    {
      name: 'nav.items.datasets',
      path: '/datasets',
      key: 'datasets'
    },
    {
      name: 'nav.items.stats',
      path: '/statistics',
      key: 'stats'
    },
    {
      name: 'nav.items.mobile-application',
      path: 'https://bioloc.biaman.pl/',
      key: 'mobile-application',
      target: '_blank'
    }
  ];

  /**
   * Menu structure returned by API
   */
  public responseData: any;

  /**
   * Getter of menu structure
   */
  public get menuStructure(): NavigationItem[] {
    return this._menuStructure;
  }

  /**
   * Setter for menu structure
   *
   * @param {NavigationItem[]} newValue Navigation items
   */
  public set menuStructure(newValue: NavigationItem[]) {
    this._menuStructure = newValue;
  }

  /**
   * Returns menu object by slug name
   *
   * @param {*} slug
   */
  public getMenuBySlug(slug) {
    const menu = this.responseData['menu'];
    if (menu) {
      return menu.find(item => item.slug === slug);
    }

    return null;
  }

  /**
   * Creates an instance of UtilsService.
   * @param {HttpClient} http Http Client
   * @param {LanguageService} lang Language service
   * @param {Title} titleService Title service
   * @param {Meta} metaService Meta service
   * @param {DatasetsService} DSService Datasets service
   * @param loaderService Loader service
   * @memberof UtilsService
   */
  constructor(
    public http: HttpClient,
    public lang: LanguageService,
    private titleService: Title,
    private metaService: Meta,
    public DSService: DatasetsService,
    public loaderService: LoaderService
  ) {}

  /**
   * Sets seo tags
   *
   * @param {*} object
   * @param {string} [keyname=['title_seo', 'description', 'keywords_seo']]
   * @memberof UtilsService
   */
  public setSEO(object, keyname = ['title_seo', 'description', 'keywords_seo', 'og_image', 'og_type', 'author']) {
    if (object[keyname[0]] !== undefined) {
      this.titleService.setTitle(object[keyname[0]]);
    }

    if (object[keyname[1]] !== undefined) {
      this.metaService.addTags([
        { name: 'description', content: object[keyname[1]] },
        { name: 'keywords', content: object[keyname[2]] },
        { name: 'robots', content: 'index, follow' }
      ]);
    }

    if (object[keyname[3]] !== undefined) {
      this.metaService.addTag({ property: 'og:image', content: object[keyname[3]] });
    }

    if (object[keyname[4]] !== undefined) {
      this.metaService.addTag({ property: 'og:type', content: object[keyname[4]] });
    }

    if (object[keyname[5]] !== undefined) {
      this.metaService.addTag({ property: 'author', content: object[keyname[5]] });
    }
  }

  /**
   * Gets from API page data
   *
   * @param {*} slug
   * @returns
   * @memberof UtilsService
   */
  public getPageContent(slug) {
    const menu = this.getMenuBySlug(slug);
    return this.http.get(`${AppConfigService.config.api}${menu.url}`);
  }

  /**
   * Gets menu structure from API
   *
   * @returns
   * @memberof UtilsService
   */
  public getStructure() {
    return new Promise((res, rej) => {
      this.http.get(`${AppConfigService.config.api}structure`).subscribe(response => {
        this.responseData = response;
        this.buildStructure();
        this.menuReadySubject.next();
        this.structureCreated = true;
        return res();
      });
    });
  }

  /**
   * Creates structure for navigation from API data
   *
   * @memberof UtilsService
   */
  buildStructure() {
    const menu = this.responseData['menu'];
    if (menu) {
      this.menuStructure = [
        ...this.basicStructure,
        ...menu
          .map(item => {
            return (item = {
              name: item.title,
              path: `/more/${item.slug}`,
              url: item.url,
              parent_id: item.parent_id,
              key: '',
              children: menu
                .filter(child => child.parent_id === item.id)
                .map(childItem => {
                  return {
                    name: childItem.title,
                    path: `/more/${childItem.slug}`,
                    url: childItem.url,
                    key: ''
                  };
                })
            });
          })
          .filter(item => item.parent_id === null),
        {
          name: 'Blog',
          path: '/blog',
          key: 'blog'
        }
      ];
    }
  }

  /**
   * Gets home page from API
   *
   * @returns
   * @memberof UtilsService
   */
  getHomePage() {
    return this.http.get(`${AppConfigService.config.api}home`);
  }

  /**
   * Get whole structure from API
   */
  getWholeStructure() {
    return this.http.get(`${AppConfigService.config.api}structure`);
  }

  /**
   * Get current pagination page for metadata
   */
  public get page() {
    return this.DSService.searchFilters.data.start;
  }

  /**
   * Gets column keys and triggers fetch data for CSV
   */
  getMetadata() {
    this.loaderService.isLoading = true;
    let columnKeys = [];
    this.DSService.getMetadata().subscribe(response => {
      Object.values(response).forEach((value: any) => {
        columnKeys = [...columnKeys, ...Object.keys(value.fields)];
      });
      this.getDataForMetadataExport(columnKeys);
    });
  }

  /**
   * Fetches metadata from backend and triggers converting to file
   */
  getDataForMetadataExport(columnKeys) {
    const allMetadata = [];
    this.DSService.searchFilters = { field: 'start', data: this.page, search: true };
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
      this.DSService.searchFilters = { field: 'start', data: this.page, search: true };
      this.DSService.searchFilters = { field: 'rows', data: 15, search: true };

      if (identifiers.length) {
        this.DSService.details(identifiers).subscribe((details: any) => {
          Object.values(details).forEach((singleDataset: any) => {
            allMetadata.push(this.convertMetadata(singleDataset?.latestVersion?.metadataBlocks));
          });
          this.convertMetadataToFile(columnKeys, allMetadata);
        });
      }
    });
  }

  /**
   * Convert raw data to CSV and downloads it
   * @param {any} keys Column keys
   * @param {any} allMetadata All metadata
   */
  convertMetadataToFile(keys: any, allMetadata: any) {
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
        if (meta[key] !== undefined && typeof meta[key] !== 'object') {
          const noNewLineInMeta = meta[key].replace(/(\r\n|\n|\r)/gm, '');
          temp[indexer[key]] = noNewLineInMeta;
        } else {
          temp[indexer[key]] = meta[key];
        }
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
    this.loaderService.isLoading = false;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * Search through object values and format them into readable object
   * @param metadata Metadata
   */
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

  /**
   * Parse object to query param string
   * @param {any} object Object
   * @returns {string} Query params
   */
  getQueryParamsFromObject(object: any) {
    return Object.keys(object)
      .filter(key => {
        return object[key] instanceof Array ? object[key].length > 0 : object[key] !== '' && object[key] !== null;
      })
      .map(key => {
        if (object[key] instanceof Array) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(object[key].join(','));
        } else {
          return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
        }
      })
      .join('&');
  }

  /**
   * Error handler for missing thumbnails
   * @param event Event
   */
  errorHandler(event) {
    event.target.src = '/assets/images/no_photo.png';
  }
}
