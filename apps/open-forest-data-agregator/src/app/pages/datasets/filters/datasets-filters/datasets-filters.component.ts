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
  public filtersConfig = {};

  public moreCountStart = 6;
  public orderCounter = 0;

  public showAdvanced = false;
  public structureFirstTimeCreated = true;
  public moreFilters = false;

  public searchValue = '';

  public subs: Subscription = new Subscription();

  public basicFiltersKeys = [];

  public get filtersState() {
    return this.DSService.searchFilters.data;
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
        // this.removeFilterByName(payload.name, payload.index);
      })
    );

    this.subs.add(
      this.DSService.updateQuerySubject.subscribe(query => {
        this.searchValue = query;
        this.cd.detectChanges();
      })
    );

    this.subs.add(this.DSService.newFiltersStructureSubject.subscribe(_ => this.createStructure()));

    const exclude = ['start', 'rows', 'category', 'q', 'mediaStatic', 'geoStatic'];
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
            values: this.structureFirstTimeCreated
              ? this.queryParams['category']
              : this.filtersByKey['category'].values || [],
            multiple: false,
            items: Object.keys(data[advKey]['category']).map(i =>
              Object.create({
                id: data[advKey]['category'][i]['name'],
                label: data[advKey]['category'][i]['friendly_name']
              })
            ),
            type: 'SIGNLE-SELECT',
            activeOrder: this.queryParams['category'] ? this.orderCounter : null
          }
        ]
      }
    ];

    this.filtersByKey['category'] = filtersConfig[0].data[0];
    if (this.queryParams['category']) this.orderCounter += 1;

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
        const filterObj = {
          key,
          isExpanded: this.structureFirstTimeCreated
            ? anyValues.filter(value => value).length
            : this.filtersByKey[key]
            ? this.filtersByKey[key].isExpanded
            : false,
          name: filter['friendly_name'],
          values: anyValues.filter(value => value),
          multiple: true,
          items: filter['attributes'].map(_ => _.name),
          type,
          activeOrder: anyValues.filter(value => value).length ? this.orderCounter : null
        };
        this.filtersByKey[key] = filterObj;
        config.data.push(filterObj);
        if (this.queryParams[key]) this.orderCounter += 1;
      }
    });

    if (this.structureFirstTimeCreated) {
      this.DSService.searchFilters = {
        field: 'basic',
        data: filtersConfig,
        search: Boolean(Object.keys(this.queryParams).length)
      };
    }

    this.filtersConfig = filtersConfig;
    this.basicFiltersKeys = Object.keys(this.DSService.searchData.list.available_filter_fields);
    this.structureFirstTimeCreated = false;

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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
