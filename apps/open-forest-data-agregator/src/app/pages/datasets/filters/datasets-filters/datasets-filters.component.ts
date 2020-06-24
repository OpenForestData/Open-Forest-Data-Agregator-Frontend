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

  public moreCountStart = 5;
  public subs: Subscription = new Subscription();
  public checkbox = {
    mediaStatic: {
      key: 'media',
      value: false
    },
    geoStatic: {
      key: 'coordinates',
      value: false
    }
  };
  public filters = {};
  public categories: any = {
    data: () => {}
  };

  public queryParams = {};
  public keys = Object.keys;
  public moreFilters = false;
  public isMobile = false;
  public showAdvanced = false;
  public searchFilterValue = '';
  public searchValue = '';
  public orderCounter = 1;
  public queryVisible = false;

  private advancedByKey = {};
  private advancedFiltersConfig = [];

  public datePickerConfig = {
    locale: 'pl-PL',
    disableKeypress: true,
    unSelectOnClick: false,
    firstDayOfWeek: 'mo'
  };

  public get selectedCategory() {
    return this.DSService.searchFilters.data.category;
  }

  public get advancedFilters() {
    this.advancedFiltersConfig.forEach(group => {
      group.items = this.searchFilterValue
        ? group.data.filter((item: any) => item.name.toLowerCase().includes(this.searchFilterValue.toLowerCase()))
        : group.data;
    });

    return this.advancedFiltersConfig;
  }

  public updateActiveFilters() {
    let activeArr = [
      {
        name: 'search.search',
        type: 'SELECT',
        values: [this.searchValue].filter(item => item.length)
      },
      {
        name: 'search.category',
        type: 'SELECT',
        values: this.DSService.searchFilters.data['category'] ? [this.DSService.searchFilters.data['category']] : []
      },
      {
        name: 'search.mediaStatic',
        type: 'SELECT',
        values: this.checkbox.mediaStatic.value ? ['True'] : []
      },
      {
        name: 'search.geoStatic',
        type: 'SELECT',
        values: this.checkbox.geoStatic.value ? ['True'] : []
      }
    ];
    this.advancedFiltersConfig.forEach(group => {
      // @ts-ignore
      group.data.forEach(item => {
        if (item.name === 'search.categories') return;
        activeArr.push({
          name: item.name,
          type: item.type,
          values: Array.isArray(item.values)
            ? item.values.filter((_: any) => (_ === undefined ? false : _.length))
            : [item.values].filter((_: any) => (_ === undefined ? false : _.length))
        });
      });
    });

    activeArr = activeArr.filter(item => item.values.length);
    console.log(activeArr);

    this.DSService.activeFiltersArray = activeArr;
  }

  public get queryArray() {
    let queryArr = [
      {
        key: 'Q',
        type: 'SELECT',
        values: [this.searchValue].filter(item => item.length)
      }
    ];
    this.advancedFiltersConfig.forEach(group => {
      // @ts-ignore
      group.data.forEach(item => {
        queryArr.push({
          key: item.key,
          type: item.type,
          values: Array.isArray(item.values)
            ? item.values.filter((_: any) => (_ === undefined ? false : _.length))
            : [item.values].filter((_: any) => (_ === undefined ? false : _.length))
        });
      });
    });

    queryArr = queryArr.filter(item => item.values.length);

    return queryArr.map(item => {
      if (item.values.length > 1) {
        if (item.type === 'DATE') {
          // item.values = ['FROM', item.values[0], 'TO', item.values[1]];
          item.values = [item.values[0]];
        } else {
          item.values = item.values.join('OR').split(',');
          item.values[0] = '(' + item.values[0];
          item.values[item.values.length - 1] += ')';
        }
      }
      item.values = item.values.map(_ => _.trim());
      return item;
    });
  }

  public get advancedSelected() {
    return []
      .concat(...this.advancedFiltersConfig.map(item => item.items))
      .filter(item => item.activeOrder)
      .sort((a, b) => (a.activeOrder > b.activeOrder ? -1 : a.activeOrder < b.activeOrder ? 1 : 0));
  }

  // tslint:disable-next-line
  @Output() onDisplayModeChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkMobile();
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
      this.DSService.updateQuerySubject.subscribe(query => {
        this.searchValue = query;
        this.cd.detectChanges();
      })
    );

    this.subs.add(
      this.DSService.dataChangedSubject.subscribe(() => {
        if (!this.advancedFiltersConfig.length) {
          this.searchValue = this.DSService.searchFilters.data['q'];
          const data = this.DSService.searchData['list'];
          const groupOrder = {};
          const typeConversion = {
            TEXT: 'INPUT',
            NONE: 'INPUT',
            TEXTBOX: 'SELECT',
            DATE: 'DATE'
          };
          const advKey = 'listing_filter_fields';

          this.advancedFiltersConfig = [
            {
              title: '',
              headerVisible: false,
              items: [],
              data: [
                {
                  key: 'category',
                  name: 'search.categories',
                  values: this.queryParams['category'] || [],
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

          this.advancedByKey['category'] = this.advancedFiltersConfig[0].data[0];

          if (this.queryParams['category']) this.orderCounter += 1;

          Object.keys(data['filter_groups']).forEach((key, i) => {
            this.advancedFiltersConfig.push({
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
              const config = this.advancedFiltersConfig[groupIndex];
              const filterObj = {
                key: filter['field_name'],
                name: filter['friendly_name'],
                values: this.queryParams[filter['field_name']] || [],
                items: filter['attributes'].map(_ => _.name),
                type: typeConversion[filter.type] || 'INPUT',
                activeOrder: this.queryParams[filter['field_name']] ? this.orderCounter : null
              };

              this.advancedByKey[filter['field_name']] = filterObj;

              config.data.push(filterObj);

              if (this.queryParams[filter['field_name']]) this.orderCounter += 1;
            }
          });

          this.searchAdvenced();
        }
        this.cd.detectChanges();
        this.updateActiveFilters();
      })
    );

    const exclude = ['start', 'rows', 'category', 'q', 'mediaStatic', 'geoStatic'];
    this.route.queryParams.subscribe(params => {
      const p = {};
      // tslint:disable-next-line: forin
      for (const index in params) {
        // tslint:disable-next-line: prefer-conditional-expression
        if (exclude.includes(index)) {
          p[index] = params[index];
        } else {
          p[index] = !Array.isArray(params[index]) ? [params[index]] : params[index];
        }
      }
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
            this.checkbox[item].value = true;
            this.DSService.searchFilters = { field: item, data: true };
            break;
        }
      }
    });

    this.getFilters();
    this.getFilters(false);
  }

  ngOnInit(): void {
    this.checkMobile();
    setTimeout(() => {
      this.filtersChanged(null);
    }, 0);
  }

  updateBasic() {
    const currentState = this.DSService.searchFilters.data;
    this.DSService.updateQuerySubject.next(this.searchValue);
    Object.keys(this.filters).forEach(key => {
      this.filters[key].value = this.advancedByKey[key].values;
    });
  }

  checkboxChange(newValue, type) {
    this.DSService.searchFilters = { field: type, data: newValue };
  }

  updateAdvanced() {
    const currentState = this.DSService.searchFilters.data;
    this.DSService.updateQuerySubject.next(this.searchValue);
    Object.keys(this.filters).forEach(key => {
      if (this.advancedByKey[key]) {
        this.advancedByKey[key].values = this.filters[key].value;
        if (this.filters[key].value.length) {
          this.advancedByKey[key].activeOrder = this.orderCounter;
          this.orderCounter += 1;
        }
      }
    });
  }

  search() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue };
  }

  getFilters(beginning = true) {
    const filter = this.DSService.searchData.list.available_filter_fields;
    Object.keys(filter).forEach(key => {
      const obj = {
        isExpanded: this.filters[key] ? this.filters[key].isExpanded : this.queryParams[key] ? true : false,
        key,
        value: this.filters[key] ? this.filters[key].value : this.queryParams[key] ? this.queryParams[key] : [],
        name: filter[key].friendly_name,
        multiple: true,
        data: () => {
          return filter[key].attributes
            ? filter[key].attributes.map(item => Object.create({ name: item.name, value: item.name }))
            : [];
        }
      };

      if (key === 'category') {
        obj.multiple = false;
        obj.data = () => {
          return Object.keys(filter[key]).map(k2 =>
            Object.create({ name: filter['category'][k2].friendly_name, value: filter['category'][k2].name })
          );
        };
        this.categories = obj;
      } else {
        this.filters[key] = obj;
      }
    });

    return beginning
      ? Object.keys(this.filters).slice(0, this.moreCountStart)
      : Object.keys(this.filters).slice(this.moreCountStart);
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

  categoryChanged(value) {
    this.DSService.searchFilters = { field: 'category', data: value };
  }

  filtersChanged(payload) {
    this.updateAdvanced();
    this.DSService.searchFilters = { field: 'basic', data: this.filters };
  }

  searchAdvenced() {
    const activeArr = {};
    let catValue = null;

    this.advancedFiltersConfig.forEach(group => {
      group.data
        .filter(item => item.activeOrder)
        .forEach(item => {
          let values = Array.isArray(item.values) ? item.values : [item.values];
          if (item.type === 'DATE') {
            values = values.map(_ => _.format('YYYY-MM-DD'));
          }
          if (item.key === 'category') {
            catValue = values[0];
          } else {
            activeArr[item.key] = { key: item.key, value: values };
          }
        });
    });

    if (this.searchValue) {
      this.DSService.searchFilters = { field: 'q', data: this.searchValue };
    }

    if (catValue) {
      this.DSService.searchFilters = { field: 'category', data: catValue };
    }

    this.showAdvanced = false;
    this.DSService.hideHeader = false;
    this.DSService.searchFilters = { field: 'basic', data: activeArr };

    this.updateBasic();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  checkMobile() {
    if (this.isMobile !== window.innerWidth <= 1200) {
      this.isMobile = window.innerWidth <= 1200;
      this.moreFilters = this.isMobile;

      this.onDisplayModeChange.emit(this.isMobile ? 'mobile' : 'desktop');
    }
  }
}
