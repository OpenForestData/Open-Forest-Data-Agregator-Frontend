import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Input
} from '@angular/core';
import { categoriesMock } from '@app/pages/datasets/datasets.mock';
import { DatasetsService } from '../../datasets.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ofd-agregator-datasets-filters',
  templateUrl: './datasets-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./datasets-filters.component.scss']
})
export class DatasetsFiltersComponent implements OnInit, OnDestroy {
  @Input() hideBasic;

  public typeConversion = {
    TEXT: 'INPUT',
    NONE: 'INPUT',
    MAP: 'MAP',
    DATERANGE: 'DATERANGE',
    TEXTBOX: 'SELECT',
    DATE: 'DATE'
  };
  public queryParams = {};
  public filtersByKey = {};

  public moreCountStart = 6;
  public orderCounter = 1;

  public showAdvanced = false;
  public structureFirstTimeCreated = true;
  public moreFilters = false;

  public searchValue = '';
  public searchFilterValue = '';

  public subs: Subscription = new Subscription();

  public basicFiltersKeys = [];
  public filtersConfig = [];

  public get filtersState() {
    return this.DSService.searchFilters.data;
  }

  public get advancedFilters() {
    return this.filtersConfig.map(group => {
      group.items = this.searchFilterValue
        ? group.data.filter((item: any) => item.name.toLowerCase().includes(this.searchFilterValue.toLowerCase()))
        : group.data;

      return group;
    });
  }

  public get advancedSelected() {
    return []
      .concat(...this.filtersConfig.map(item => item.data))
      .filter(item => item.activeOrder)
      .sort((a, b) => (a.activeOrder > b.activeOrder ? -1 : a.activeOrder < b.activeOrder ? 1 : 0));
  }

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

  ngOnInit() {}

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
    const filtersConfig = [
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
        const config = filtersConfig[groupIndex];
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

        const filterObj = {
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

  getFilters(beginning = true) {
    return beginning
      ? this.basicFiltersKeys.filter(name => name !== 'category').slice(0, this.moreCountStart)
      : this.basicFiltersKeys.filter(name => name !== 'category').slice(this.moreCountStart);
  }

  filtersChanged() {
    this.DSService.searchFilters = {
      field: 'basic',
      data: this.filtersConfig,
      search: true
    };
  }

  toogleFilter(item) {
    if (item.activeOrder) {
      item.activeOrder = null;
      item.values = [];
    } else {
      this.orderCounter += 1;
      item.activeOrder = this.orderCounter;
    }
  }

  closeAdvenced() {
    this.showAdvanced = false;
    this.DSService.hideHeader = false;
  }

  searchAdvenced() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue };
    const cat = this.filtersByKey['category'].values.length ? this.filtersByKey['category'].values : '';

    this.DSService.searchFilters = { field: 'category', data: cat };

    this.showAdvanced = false;
    this.DSService.hideHeader = false;
    this.DSService.searchFilters = { field: 'basic', data: this.filtersConfig, search: true };
  }

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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
