import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';

/**
 * Interface for filters in dataset view
 *
 * @interface Ifilters
 */
interface Ifilters {
  q: string;
  start: number;
  rows: number;
  sort: string;
  category: string;
  geoStatic: boolean;
  mediaStatic: boolean;
  basic: {};
}

/**
 * Interface for searchData variable.
 * It's used across whole dataset module.
 * Holds response from API
 *
 * @interface IsearchData
 */
interface IsearchData {
  list: {
    available_filter_fields: {};
    results: [];
  };
}

/**
 * Dataset service, makes http reuqests and prepare format to send
 *
 * @export
 * @class DatasetsService
 */
@Injectable({
  providedIn: 'root'
})
export class DatasetsService {
  /**
   * If page header is visible.
   * It's hidden when any component must bo on top of the page, ex. modals
   *
   * @memberof DatasetsService
   */
  public hideHeaderValue = false;

  /**
   * Subject for new search data
   * Triggered after http request
   *
   * @type {Subject<any>}
   * @memberof DatasetsService
   */
  public dataChangedSubject: Subject<any> = new Subject();
  /**
   * Subject for search data.
   * Trigger before, and it's ask for get new data
   *
   * @type {Subject<any>}
   * @memberof DatasetsService
   */
  public triggerSearchSubject: Subject<any> = new Subject();
  /**
   * Subject, send when advanced filters have to be opened
   *
   * @type {Subject<any>}
   * @memberof DatasetsService
   */
  public showAdvancedSubject: Subject<any> = new Subject();

  /**
   * Update search query for datasets in every search input for this purpuse
   *
   * @type {Subject<string>}
   * @memberof DatasetsService
   */
  public updateQuerySubject: Subject<string> = new Subject();

  /**
   * Send to filters component what filter need to be deleted.
   * Triggered by filters in tag form at dataset list
   *
   * @type {Subject<{ name: string; index: number }>}
   * @memberof DatasetsService
   */
  public removeFilterSubject: Subject<{ name: string; index: number }> = new Subject();

  /**
   * Triggered after new data has been fetch and new filters structure must be created
   *
   * @type {Subject<any>}
   * @memberof DatasetsService
   */
  public newFiltersStructureSubject: Subject<any> = new Subject();

  /**
   * Triggered after data from queryParams where loaded.
   * All related components load type (default or from queryParams) of sort after that
   *
   * @type {Subject<any>}
   * @memberof DatasetsService
   */
  public sortSubject: Subject<any> = new Subject();

  /**
   * Time out function hold, time out after search begins.
   * That way we control if search is no triggered twice.
   *
   * @private
   * @memberof DatasetsService
   */
  private searchDebounceTimeout = null;

  /**
   * Holds filters value
   *
   * @private
   * @type {Ifilters}
   * @memberof DatasetsService
   */
  private _searchFilters: Ifilters = {
    q: '',
    start: 1,
    rows: 15,
    sort: 'asc',
    category: '',
    geoStatic: false,
    mediaStatic: false,
    basic: {}
  };

  /**
   * Holds API data
   *
   * @private
   * @type {IsearchData}
   * @memberof DatasetsService
   */
  private _searchData: IsearchData = {
    list: {
      available_filter_fields: {},
      results: []
    }
  };

  /**
   * Getter of _searchData
   *
   * @memberof DatasetsService
   */
  public get searchData() {
    return this._searchData;
  }

  /**
   * Getter of hideHeaderValue
   *
   * @memberof DatasetsService
   */
  public get hideHeader() {
    return this.hideHeaderValue;
  }

  /**
   * Toggles app header
   *
   * @memberof DatasetsService
   */
  public set hideHeader(newValue) {
    this.hideHeaderValue = newValue;
    if (isPlatformBrowser(this.platformId)) {
      if (newValue) {
        document.body.classList.add('hide-overflow');
      } else {
        document.body.classList.remove('hide-overflow');
      }
    }
  }

  /**
   * Sets new value of _searchData
   * If there are no new filters values shows preserve previous one
   *
   * @memberof DatasetsService
   */
  public set searchData(newValue: IsearchData) {
    // tslint:disable-next-line: adjacent-overload-signatures
    if (!newValue.list.available_filter_fields)
      newValue.list.available_filter_fields = this._searchData.list.available_filter_fields;

    this._searchData = newValue;

    this.dataChangedSubject.next();
  }

  /**
   * Setter for _searchFilters
   * Always set one value with key `value.field` and value `value.data`
   * if `value.search` is true, at the end timeout with search subject will be set
   *
   * @memberof DatasetsService
   */
  public set searchFilters(value: { field: string; data: any; search?: boolean }) {
    const excludeReset = ['sort', 'start'];

    if (!excludeReset.includes(value.field) || this._searchFilters['start'] < 1) {
      this._searchFilters['start'] = 1;
    }

    if (value.field === 'basic') {
      Object.keys(value.data).forEach(key => {
        this._searchFilters[value.field][key] = value.data[key];
      });
    } else {
      this._searchFilters[value.field] = value.data;
    }

    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout);
    }

    if (value.search) {
      this.searchDebounceTimeout = setTimeout(() => {
        this.triggerSearchSubject.next();
        const url =
          this.router.createUrlTree([], { relativeTo: this.activatedRoute }).toString() + this.searchFilters.field;
        this.location.go(url);
      }, 150);
    }
  }

  /**
   * Creates queryString for all filters and returns current filters state
   *
   * @memberof DatasetsService
   */
  public get searchFilters() {
    const queryString = `
      ?start=${this._searchFilters.start - 1}&
      rows=${this._searchFilters.rows}&
      sort=${this._searchFilters.sort}
      ${this._searchFilters.q ? '&q=' + this._searchFilters.q : ''}
      ${this._searchFilters.geoStatic ? '&geoStatic=true' : ''}
      ${this._searchFilters.mediaStatic ? '&mediaStatic=true' : ''}
      ${this._searchFilters.category ? '&category=' + this._searchFilters.category : ''}
      ${this.objectToQuery(this._searchFilters.basic)}
    `
      .trim()
      .replace(/\s/g, '');

    return {
      field: queryString,
      data: this._searchFilters
    };
  }

  /**
   * Creates an instance of DatasetsService.
   * @param {HttpClient} http
   * @param {Location} location
   * @param {Router} router
   * @param {string} platformId
   * @param {ActivatedRoute} activatedRoute
   * @memberof DatasetsService
   */
  constructor(
    public http: HttpClient,
    private location: Location,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: string,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Shots to API for datasets
   *
   * @returns
   * @memberof DatasetsService
   */
  search() {
    return this.http.get(`${AppConfigService.config.api}search${this.searchFilters.field}`);
  }

  /**
   * Resets filters state to default
   *
   * @memberof DatasetsService
   */
  resetFilters() {
    this._searchFilters = {
      q: '',
      start: 1,
      rows: 15,
      sort: 'asc',
      category: '',
      geoStatic: false,
      mediaStatic: false,
      basic: {}
    };
  }

  /**
   * Converts object to queryString
   * If encode is eq. true the out is typical browsere query String
   * If not it's query string for humans
   *
   * @param {*} object
   * @param {boolean} [encode=true]
   * @returns
   * @memberof DatasetsService
   */
  public objectToQuery(object, encode = true) {
    const objectQueryString = [];

    Object.keys(object).forEach(index => {
      const groupData = object[index]['data'];
      groupData
        .filter(filter => {
          const value = Array.isArray(filter['values']) ? filter['values'] : [filter['values']];
          return value.filter(item => item).length && filter.key !== 'category';
        })
        .forEach(filter => {
          const key = filter['key'];
          let values = [...(Array.isArray(filter['values']) ? filter['values'] : [filter['values']])];
          if (filter['type'] === 'DATE') {
            values[0] = values[0].format ? values[0].format('YYYY-MM-DD') : values[0];
          }

          if (filter['type'] === 'DATERANGE') {
            if (Boolean(values[0]) || Boolean(values[1])) {
              values[0] = values[0] ? (values[0].format ? values[0].format('YYYY-MM-DD') : values[0]) : 'null';
              values[1] = values[1] ? (values[1].format ? values[1].format('YYYY-MM-DD') : values[1]) : 'null';
            } else {
              values = [];
            }
          }

          if (filter['type'] === 'MAP' && values.length) {
            values = [`${values[0]['lat']}_${values[0]['lng']}`, `${values[1]['lat']}_${values[1]['lng']}`];
          }

          const temp = [];
          values
            .filter(value => value !== undefined && values !== null)
            .forEach(value => {
              if (Array.isArray(value)) {
                value.forEach(_ => {
                  if (encode) {
                    objectQueryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(_));
                  } else {
                    temp.push(_);
                  }
                });
              } else {
                if (encode) {
                  objectQueryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                } else {
                  temp.push(value);
                }
              }
            });

          if (temp.length) {
            objectQueryString.push(`${key}=(${temp.join(' OR ')})`);
          }
        });
    });

    if (encode) {
      return objectQueryString.length ? `&${objectQueryString.join('&')}` : ``;
    } else {
      return objectQueryString.length ? `${objectQueryString.join(' AND ')}` : ``;
    }
  }

  /**
   * Gets details about datasets by their identifiers
   *
   * @param {*} identifiers
   * @returns
   * @memberof DatasetsService
   */
  details(identifiers) {
    return this.http.post(`${AppConfigService.config.api}datasets`, { identifiers });
  }

  /**
   * Gets dataset by DOI
   *
   * @param {*} doi
   * @returns
   * @memberof DatasetsService
   */
  getDatasetByDOI(doi: any) {
    return this.http.get<any>(`${AppConfigService.config.api}dataset?identifier=${doi}`);
  }

  /**
   * Gets resource by ID
   *
   * @param {number} id
   * @returns
   * @memberof DatasetsService
   */
  getResourceByID(id: number) {
    return this.http.get<any>(`${AppConfigService.config.api}resource/${id}`);
  }

  getMetadata() {
    return this.http.get<any>(`${AppConfigService.config.api}avilable-metadata`);
  }
}
