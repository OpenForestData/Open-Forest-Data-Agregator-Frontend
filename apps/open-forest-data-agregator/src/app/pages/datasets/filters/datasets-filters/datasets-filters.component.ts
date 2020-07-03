import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DatasetsService } from '../../datasets.service';

/**
 * Interface for data type of single filter
 *
 * @interface IFilterData
 */
interface IFilterData {
  key: string;
  isExpanded: boolean;
  name: string;
  values: any;
  multiple: boolean;
  items: {};
  type: string;
  activeOrder: null | number;
}
/**
 * Group filters interface
 *
 * @interface IFiltersStructure
 */
interface IFiltersStructure {
  title: string;
  headerVisible: boolean;
  items: [];
  data: IFilterData[];
}

/**
 * Main view of datasets filters
 *
 * @export
 * @class DatasetsFiltersComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-datasets-filters',
  templateUrl: './datasets-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./datasets-filters.component.scss']
})
export class DatasetsFiltersComponent implements OnDestroy {
  /**
   * Collapse filters column
   *
   * @memberof DatasetsFiltersComponent
   */
  @Input() hideBasic;

  /**
   * Key/Value convert object
   *
   * @memberof DatasetsFiltersComponent
   */
  public typeConversion = {
    TEXT: 'INPUT',
    NONE: 'INPUT',
    MAP: 'MAP',
    DATERANGE: 'DATERANGE',
    TEXTBOX: 'SELECT',
    DATE: 'DATE'
  };

  /**
   * Holds query params from URL
   *
   * @memberof DatasetsFiltersComponent
   */
  public queryParams = {};

  /**
   * Filters in objecy hold by their key
   *
   * @memberof DatasetsFiltersComponent
   */
  public filtersByKey = {};

  /**
   * Number of filters shown before "show more" is showed
   *
   * @memberof DatasetsFiltersComponent
   */
  public moreCountStart = 6;

  /**
   * Uniq number that incread with every selected filter
   * Its base of sorting in advanced ciew
   *
   * @memberof DatasetsFiltersComponent
   */
  public orderCounter = 1;

  /**
   * Is advanced view active
   *
   * @memberof DatasetsFiltersComponent
   */
  public showAdvanced = false;

  /**
   * If data are fetch first time
   *
   * @memberof DatasetsFiltersComponent
   */
  public structureFirstTimeCreated = true;

  /**
   * Expand/show all filters
   *
   * @memberof DatasetsFiltersComponent
   */
  public moreFilters = false;

  /**
   * Value of search input
   *
   * @memberof DatasetsFiltersComponent
   */
  public searchValue = '';

  /**
   * Search filters input value in advanced view
   *
   * @memberof DatasetsFiltersComponent
   */
  public searchFilterValue = '';

  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof DatasetsFiltersComponent
   */
  public subs: Subscription = new Subscription();

  /**
   * Holds keys for basic filters
   *
   * @memberof DatasetsFiltersComponent
   */
  public basicFiltersKeys = [];

  /**
   * Contains structure for filters
   *
   * @memberof DatasetsFiltersComponent
   */
  public filtersConfig = [];

  /**
   * Show filter list at mobile view
   *
   * @memberof DatasetsFiltersComponent
   */
  public showAdvencedListMobile = false;

  /**
   * Get filters state from service
   *
   * @readonly
   * @memberof DatasetsFiltersComponent
   */
  public get filtersState() {
    return this.DSService.searchFilters.data;
  }

  /**
   * Get advanced filters list filtered by serachFilterValue
   *
   * @readonly
   * @memberof DatasetsFiltersComponent
   */
  public get advancedFilters() {
    return this.filtersConfig.map(group => {
      group.items = this.searchFilterValue
        ? group.data.filter((item: any) => item.name.toLowerCase().includes(this.searchFilterValue.toLowerCase()))
        : group.data;

      return group;
    });
  }

  /**
   * Get active selected filters, order by activeOrder key
   *
   * @readonly
   * @memberof DatasetsFiltersComponent
   */
  public get advancedSelected() {
    return []
      .concat(...this.filtersConfig.map(item => item.data))
      .filter(item => item.activeOrder)
      .sort((a, b) => (a.activeOrder > b.activeOrder ? -1 : a.activeOrder < b.activeOrder ? 1 : 0));
  }

  /**
   * Create's readable for human query
   *
   * @readonly
   * @memberof DatasetsFiltersComponent
   */
  public get queryArray() {
    const filters = this.DSService.searchFilters.data;
    const cat = this.filtersByKey['category'].values.length ? this.filtersByKey['category'].values : '';

    let queryString = `${this.searchValue ? 'q=' + this.searchValue + ' AND ' : ''}${
      filters.geoStatic ? 'geoStatic=true  AND ' : ''
    }${filters.mediaStatic ? 'mediaStatic=true  AND ' : ''}${
      cat ? 'category=' + cat + ' AND ' : ''
    }${this.DSService.objectToQuery(this.filtersConfig, false)}`.trim();

    if (queryString.substr(-4) === ' AND') {
      queryString = queryString.slice(0, -4);
    }

    if (queryString.substr(-3) === ' OR') {
      queryString = queryString.slice(0, -3);
    }

    return queryString;
  }

  /**
   * Creates an instance of DatasetsFiltersComponent.
   * @param {DatasetsService} DSService
   * @param {ChangeDetectorRef} cd
   * @param {ActivatedRoute} route
   * @memberof DatasetsFiltersComponent
   */
  constructor(public DSService: DatasetsService, public cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.subs.add(
      this.DSService.showAdvancedSubject.subscribe(() => {
        this.showAdvanced = true;
        this.DSService.hideHeader = true;
        this.cd.detectChanges();
      })
    );

    this.subs.add(
      this.DSService.removeFilterSubject.subscribe(payload => {
        this.removeFilterByName(payload.name, payload.index);
      })
    );

    this.subs.add(
      this.DSService.updateQuerySubject.subscribe(query => {
        this.searchValue = query;
        this.cd.detectChanges();
      })
    );

    this.subs.add(this.DSService.newFiltersStructureSubject.subscribe(_ => this.createStructure()));

    const exclude = ['start', 'rows', 'category', 'q', 'mediaStatic', 'geoStatic', 'sort'];
    this.route.queryParams.subscribe(params => {
      const p = {};
      Object.keys(params).forEach(index => {
        p[index] = exclude.includes(index)
          ? params[index]
          : Array.isArray(params[index])
          ? [params[index]]
          : params[index];
      });
      this.queryParams = p;
    });

    exclude.forEach(item => {
      if (this.queryParams[item]) {
        switch (item) {
          case 'q':
          case 'start':
          case 'rows':
          case 'sort':
          case 'category':
            this.DSService.searchFilters = { field: item, data: this.queryParams[item] };
            break;
          case 'mediaStatic':
          case 'geoStatic':
            this.DSService.searchFilters = { field: item, data: true };
            break;
        }
      }
    });
  }

  /**
   * Create structure for filters
   *
   * @memberof DatasetsFiltersComponent
   */
  createStructure() {
    this.searchValue = this.DSService.searchFilters.data['q'];
    const data = this.DSService.searchData['list'];
    const groupOrder = {};
    const advKey = 'listing_filter_fields';
    if (this.filtersByKey['category']) {
      this.filtersByKey['category'].values = this.filtersState.category;
    }
    const categoryValue =
      (this.structureFirstTimeCreated ? this.queryParams['category'] : this.filtersState.category || '') || '';
    const filtersConfig: IFiltersStructure[] = [
      {
        title: '',
        headerVisible: false,
        items: [],
        data: [
          {
            key: 'category',
            isExpanded: this.structureFirstTimeCreated
              ? this.queryParams['category']
              : this.filtersByKey['category'].values
              ? true
              : false,
            name: 'search.categories',
            values: categoryValue,
            multiple: false,
            items: Object.keys(data[advKey]['category']).map(i =>
              Object.create({
                id: data[advKey]['category'][i]['name'],
                label: data[advKey]['category'][i]['friendly_name']
              })
            ),
            type: 'SIGNLE-SELECT',
            activeOrder: categoryValue ? this.orderCounter : null
          }
        ]
      }
    ];

    this.filtersByKey['category'] = filtersConfig[0].data[0];
    if (categoryValue) this.orderCounter += 1;

    Object.keys(data['filter_groups']).forEach((key, i) => {
      filtersConfig.push({
        title: data['filter_groups'][key]['friendly_name'],
        headerVisible: true,
        items: [],
        data: []
      });
      groupOrder[data['filter_groups'][key]['id']] = i + 1;
    });

    Object.keys(data[advKey]).forEach(index => {
      if (index !== 'category') {
        const filter = data[advKey][index];
        const groupIndex = groupOrder[filter['filter_group_id']];
        const config: IFiltersStructure = filtersConfig[groupIndex];
        const key = filter['field_name'];
        const anyValues =
          (this.structureFirstTimeCreated ? this.queryParams[key] : this.filtersByKey[key].values || []) || [];
        const type = this.typeConversion[filter.type] || 'INPUT';

        let finalValue = Array.isArray(anyValues) ? anyValues.filter(value => value) : [anyValues];

        if (type === 'MAP' && anyValues.length && this.structureFirstTimeCreated) {
          const tmp = [...anyValues[0][0].split('_'), ...anyValues[0][1].split('_')];

          finalValue = [
            { lat: tmp[0], lng: tmp[1] },
            { lat: tmp[2], lng: tmp[3] }
          ];
        }

        if (['TEXT', 'TEXTBOX', 'SELECT'].includes(type) && anyValues[0] && Array.isArray(anyValues[0])) {
          finalValue = anyValues[0];
        }

        if (type === 'DATE' && anyValues.length) {
          // @ts-ignore
          finalValue = finalValue.map(item => moment(item));
        }

        if (type === 'DATERANGE' && anyValues.length) {
          // @ts-ignore
          finalValue = Array.isArray(anyValues[0]) ? anyValues[0].map(item => moment(item)) : finalValue;
        }

        const filterObj: IFilterData = {
          key,
          isExpanded: this.structureFirstTimeCreated
            ? finalValue.length
            : this.filtersByKey[key]
            ? this.filtersByKey[key].isExpanded
            : false,
          name: filter['friendly_name'],
          values: finalValue,
          multiple: true,
          items: filter['attributes'].map(_ => _.name),
          type,
          activeOrder: finalValue.length ? this.orderCounter : null
        };

        this.filtersByKey[key] = filterObj;
        config.data.push(filterObj);
        if (this.queryParams[key]) this.orderCounter += 1;
      }
    });

    if (this.structureFirstTimeCreated) {
      const exclude = ['start', 'rows', 'category', 'q', 'mediaStatic', 'geoStatic', 'sort'];
      exclude.forEach(item => {
        if (this.queryParams[item]) {
          switch (item) {
            case 'q':
            case 'start':
            case 'rows':
            case 'sort':
            case 'category':
              this.DSService.searchFilters = { field: item, data: this.queryParams[item] };
              break;
            case 'mediaStatic':
            case 'geoStatic':
              this.DSService.searchFilters = { field: item, data: true };
              break;
          }
        }
      });

      this.DSService.searchFilters = {
        field: 'basic',
        data: filtersConfig,
        search: Boolean(Object.keys(this.queryParams).length)
      };
      this.DSService.sortSubject.next();
    }

    this.filtersConfig = filtersConfig;
    this.basicFiltersKeys = Object.keys(this.DSService.searchData.list.available_filter_fields);
    this.structureFirstTimeCreated = false;

    this.searchValue = this.filtersState.q;
    this.DSService.updateQuerySubject.next(this.filtersState.q);

    this.cd.detectChanges();
  }

  /**
   * Gets filters the basic part or collapsed one
   *
   * @param {boolean} [beginning=true]
   * @returns
   * @memberof DatasetsFiltersComponent
   */
  getFilters(beginning = true) {
    return beginning
      ? this.basicFiltersKeys.filter(name => name !== 'category').slice(0, this.moreCountStart)
      : this.basicFiltersKeys.filter(name => name !== 'category').slice(this.moreCountStart);
  }

  /**
   * Emit filter value if any filter changed
   *
   * @memberof DatasetsFiltersComponent
   */
  filtersChanged() {
    this.DSService.searchFilters = {
      field: 'basic',
      data: this.filtersConfig,
      search: true
    };
  }

  /**
   * Adds or remove advanced filter
   *
   * @param {*} item
   * @memberof DatasetsFiltersComponent
   */
  toogleFilter(item) {
    if (item.activeOrder) {
      item.activeOrder = null;
      item.values = [];
    } else {
      this.orderCounter += 1;
      item.activeOrder = this.orderCounter;
    }
  }

  /**
   * Close advanced view
   */
  closeAdvenced() {
    this.showAdvanced = false;
    this.showAdvencedListMobile = false;
    this.DSService.hideHeader = false;
  }

  /**
   * Callback for advanced search button click
   * Sets values from advanced settings and runs searching
   *
   * @memberof DatasetsFiltersComponent
   */
  searchAdvenced() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue };
    const cat = this.filtersByKey['category'].values.length ? this.filtersByKey['category'].values : '';

    this.DSService.searchFilters = { field: 'category', data: cat };

    this.showAdvanced = false;
    this.DSService.hideHeader = false;
    this.DSService.searchFilters = { field: 'basic', data: this.filtersConfig, search: true };
  }

  /**
   * Removing filter value at position ( index ) by name of filter
   *
   * @param {*} name
   * @param {*} index
   * @memberof DatasetsFiltersComponent
   */
  public removeFilterByName(name, index) {
    switch (name) {
      case 'search':
        this.searchValue = '';
        break;
      case 'category':
        this.filtersByKey['category'].values = '';
        break;
      case 'mediaStatic':
        this.DSService.searchFilters = { field: 'mediaStatic', data: false, search: true };
        break;
      case 'geoStatic':
        this.DSService.searchFilters = { field: 'geoStatic', data: false, search: true };
        break;
      default:
        if (this.filtersByKey[name]) {
          switch (this.filtersByKey[name].type) {
            case 'DATERANGE':
            case 'MAP':
              this.filtersByKey[name].values = [];
              break;
            case 'SINGLE-SELECT':
              this.filtersByKey[name].values = '';
              break;
            default:
              this.filtersByKey[name].values.splice(index, 1);
              break;
          }
        }
        break;
    }
    this.searchAdvenced();
  }

  /**
   * @ignore
   *
   * @memberof DatasetsFiltersComponent
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
