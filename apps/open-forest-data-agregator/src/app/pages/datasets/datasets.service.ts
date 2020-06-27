import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';
import { Subject } from 'rxjs';
import { query } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DatasetsService {
  public hideHeaderValue = false;

  public dataChangedSubject: Subject<any> = new Subject();
  public triggerSearchSubject: Subject<any> = new Subject();
  public showAdvancedSubject: Subject<any> = new Subject();
  public updateQuerySubject: Subject<any> = new Subject();
  public removeFilterSubject: Subject<any> = new Subject();
  public newFiltersStructureSubject: Subject<any> = new Subject();

  private searchDebounceTimeout = null;
  public activeFiltersArray = [];

  private _searchFilters = {
    q: '',
    start: 1,
    rows: 15,
    sort: 'asc',
    category: '',
    geoStatic: false,
    mediaStatic: false,
    basic: {},
    advanced: {}
  };

  private _searchData: any = {
    list: {
      available_filter_fields: {},
      results: []
    }
  };

  public get searchData() {
    return this._searchData;
  }

  public get hideHeader() {
    return this.hideHeaderValue;
  }

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

  // tslint:disable-next-line: adjacent-overload-signatures
  public set searchData(newValue) {
    if (!newValue.list.available_filter_fields)
      newValue.list.available_filter_fields = this._searchData.list.available_filter_fields;

    this._searchData = newValue;

    this.dataChangedSubject.next();
  }

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
      }, 150);
    }
  }

  public get searchFilters() {
    // tslint:disable-next-line: only-arrow-functions
    const objectToQuery = function(object) {
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
            let values = Array.isArray(filter['values']) ? filter['values'] : [filter['values']];
            if (['DATE', 'DATERANGE'].includes(filter['type'])) {
              if (Boolean(values[0]) || Boolean(values[1])) {
                values[0] = Boolean(values[0]) ? values[0] : 'null';
                values[1] = Boolean(values[1]) ? values[1] : 'null';
              } else {
                values = [];
              }
            }

            values
              .filter(value => value !== undefined && values !== null)
              .forEach(value => {
                objectQueryString.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
              });
          });
      });

      return objectQueryString.length ? `&${objectQueryString.join('&')}` : ``;
    };

    const queryString = `
      ?start=${this._searchFilters.start - 1}&
      rows=${this._searchFilters.rows}&
      sort=${this._searchFilters.sort}
      ${this._searchFilters.q ? '&q=' + this._searchFilters.q : ''}
      ${this._searchFilters.geoStatic ? '&geoStatic=true' : ''}
      ${this._searchFilters.mediaStatic ? '&mediaStatic=true' : ''}
      ${this._searchFilters.category ? '&category=' + this._searchFilters.category : ''}
      ${objectToQuery(this._searchFilters.basic)}
    `
      .trim()
      .replace(/\s/g, '');

    const url = this.router.createUrlTree([], { relativeTo: this.activatedRoute }).toString() + queryString;
    this.location.go(url);

    return {
      field: queryString,
      data: this._searchFilters
    };
  }

  constructor(
    public http: HttpClient,
    private location: Location,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: string,
    private activatedRoute: ActivatedRoute
  ) {}

  search() {
    return this.http.get(`${AppConfigService.config.api}search${this.searchFilters.field}`);
  }

  resetFilters() {
    this._searchFilters = {
      q: '',
      start: 1,
      rows: 15,
      sort: 'asc',
      category: '',
      geoStatic: false,
      mediaStatic: false,
      basic: {},
      advanced: {}
    };
  }

  details(identifiers) {
    return this.http.post(`${AppConfigService.config.api}datasets`, { identifiers });
  }
}
