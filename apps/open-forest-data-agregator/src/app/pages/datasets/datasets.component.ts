import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { AppState } from '@app/store';
import { DatasetsChangeViewMode } from '@app/store/datasets/datasets.actions';
import { DatasetsService } from './datasets.service';
import { DatasetsFiltersComponent } from './filters/datasets-filters/datasets-filters.component';

/**
 * Datasets Component
 */
@Component({
  selector: 'ofd-datasets',
  templateUrl: 'datasets.component.html',
  styleUrls: ['datasets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetsComponent implements OnInit, OnDestroy {
  /**
   * Reference to view component
   *
   * @type {DatasetsFiltersComponent}
   * @memberof DatasetsComponent
   */
  @ViewChild(DatasetsFiltersComponent) filterComponent: DatasetsFiltersComponent;

  /**
   * Breadcrumbs Array
   *
   * @type {IBreadcrumbs[]}
   * @memberof DatasetsComponent
   */
  public breadcrumbs: IBreadcrumbs[] = [
    { name: 'Start', href: '/' },
    { name: 'Zbiory danych', href: '/datasets' }
  ];

  /**
   * Fullscreen for table
   *
   * @memberof DatasetsComponent
   */
  public fullscreen = false;

  /**
   * Number of pages
   *
   * @memberof DatasetsComponent
   */
  public pageCount = 0;

  /**
   * Headers for filters
   *
   * @memberof DatasetsComponent
   */
  public filters = {
    category: {
      key: 'category',
      iconSrc: '/assets/images/folder.svg',
      name: 'Kategoria',
      expandable: true,
      isExpanded: true,
      value: null
    },
    filters: {
      key: 'filters',
      iconSrc: '/assets/images/filters.svg',
      name: 'Filtry',
      expandable: true,
      isExpanded: true
    }
  };

  /**
   * Mock datasets items
   */
  public datasetsItems = [];

  /**
   * Current page
   *
   * @memberof DatasetsComponent
   */
  public page = 1;

  /**
   * Datasets data from store
   */
  public datasets: any;

  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof DatasetsComponent
   */
  public subs: Subscription = new Subscription();

  /**
   * @ignore
   */
  constructor(
    public translateService: TranslateService,
    public changeDetectorRef: ChangeDetectorRef,
    public DSService: DatasetsService,
    private store: Store<AppState>
  ) {
    this.subs.add(this.store.select('datasets').subscribe(datasets => (this.datasets = datasets)));
    this.subs.add(this.DSService.triggerSearchSubject.subscribe(() => this.getData()));
  }

  /**
   * Set category value
   *
   * @param {*} value
   * @memberof DatasetsComponent
   */
  setCategory(value) {
    this.DSService.searchFilters = { field: 'category', data: value, search: true };
  }

  /**
   * Get category from service
   *
   * @readonly
   * @memberof DatasetsComponent
   */
  public get selectedCategory() {
    return this.DSService.searchFilters.data.category;
  }

  /**
   * Get all available categories
   *
   * @readonly
   * @memberof DatasetsComponent
   */
  public get categories() {
    const filter = this.DSService.searchData.list.available_filter_fields;

    return filter['category']
      ? Object.keys(filter['category']).map(key =>
          Object.create({ name: filter['category'][key].friendly_name, value: filter['category'][key].name })
        )
      : [];
  }

  /**
   * Get page size
   *
   * @readonly
   * @memberof DatasetsComponent
   */
  public get pageSize() {
    return this.DSService.searchFilters.data.rows;
  }

  /**
   * Gets selected filters for advenced view
   *
   * @readonly
   * @memberof DatasetsComponent
   */
  public get advancedSelected() {
    if (this.filterComponent) {
      const advanced = []
        .concat(...this.filterComponent.filtersConfig.map(item => item.data))
        .filter(item => item.activeOrder && item.key !== 'category')
        .sort((a, b) => (a.activeOrder > b.activeOrder ? -1 : a.activeOrder < b.activeOrder ? 1 : 0));

      const activeArr = [
        {
          name: 'search.search',
          type: 'SELECT',
          key: 'search',
          values: [this.filterComponent.searchValue].filter(item => item.length)
        },
        {
          name: 'search.category',
          type: 'SELECT',
          key: 'category',
          values: this.DSService.searchFilters.data['category'] ? [this.DSService.searchFilters.data['category']] : []
        },
        {
          name: 'search.mediaStatic',
          type: 'SELECT',
          key: 'mediaStatic',
          values: this.filterComponent.filtersState.mediaStatic ? ['True'] : []
        },
        {
          name: 'search.geoStatic',
          type: 'SELECT',
          key: 'geoStatic',
          values: this.filterComponent.filtersState.geoStatic ? ['True'] : []
        },
        ...advanced
      ];
      return activeArr.filter(item => item.values.length);
    }

    return [];
  }

  /**
   * @ignore
   */
  ngOnInit() {
    this.DSService.resetFilters();
    this.getData();
  }

  /**
   * Sets datasets view
   */
  setDatasetsView(type: any) {
    this.DSService.searchFilters = { field: 'mediaStatic', data: type, search: true };
  }

  /**
   * Set full screen view
   *
   * @param {*} value
   * @memberof DatasetsComponent
   */
  setFullscreen(value) {
    this.fullscreen = value;
  }

  /**
   * Callback for paginantion page/size change
   *
   * @param {*} payload
   * @memberof DatasetsComponent
   */
  paginationChanged(payload) {
    this.DSService.searchFilters = { field: 'rows', data: payload.limit, search: true };
    this.DSService.searchFilters = { field: 'start', data: this.page, search: true };
  }

  /**
   * Fetch data from API & create basic strucucture
   *
   * @memberof DatasetsComponent
   */
  getData() {
    this.DSService.search().subscribe((response: any) => {
      this.DSService.searchData = response;
      const identifiers = [];
      const identifiersIndex = {};

      this.pageCount = response['list']['amount'];

      this.datasetsItems = response['list']['results'].map((item, index) => {
        identifiers.push(item.identifier);
        identifiersIndex[item.identifier] = index;
        let coords = [];

        if (item.dwcDecimalLatitude) {
          coords = [
            {
              lat: item.dwcDecimalLatitude,
              long: item.dwcDecimalLongitude
            }
          ];
        }

        return {
          id: item.id,
          datasetPersistentID: item.dsPersistentId,
          title: item.title,
          identifier: item.identifier,
          identifier64: btoa(item.identifier),
          createdAt: '',
          author: item.authorName ? item.authorName.join(', ') : '',
          category: item.dvName,
          source: item.authorAffiliation ? item.authorAffiliation.join(', ') : 'Dataverse',
          sourceLink: item.alternativeURL || null,
          preview: 'wait',
          detailsData: {},
          files: [],
          images: [],
          labels: [],
          subject: item.subject ? item.subject.join(', ') : '',
          coordinates: coords,
          description: item.dsDescriptionValue ? item.dsDescriptionValue.join(', ') : '',
          dvObjectType: item.dvObjectType,
          dwcBasisOfRecord: item.dwcBasisOfRecord,
          dwcCatalogNumber: item.dwcCatalogNumber,
          dwcClass: item.dwcClass,
          dwcCollectionCode: item.dwcCollectionCode,
          dwcCollectionCode_s: item.dwcCollectionCode_s,
          dwcContinent: item.dwcContinent,
          dwcCountry: item.dwcCountry,
          dwcDatasetName: item.dwcDatasetName,
          dwcDecimalLatitude: item.dwcDecimalLatitude,
          dwcDecimalLongitude: item.dwcDecimalLongitude,
          dwcEventDate: item.dwcEventDate,
          dwcFamily: item.dwcFamily,
          dwcGenus: item.dwcGenus,
          dvName: item.dvName
        };
      });

      if (identifiers.length) {
        this.DSService.details(identifiers).subscribe((details: any) => {
          this.datasetsItems.forEach(item => {
            const singlDetails = details[item.identifier];
            if (singlDetails) {
              if (!singlDetails.latestVersion) {
                singlDetails.latestVersion = {
                  files: []
                };
              }

              if (!singlDetails.latestVersion.files) {
                singlDetails.latestVersion.files = [];
              }

              item.createdAt = singlDetails.latestVersion.createTime;
              item.files = singlDetails.latestVersion.files;
              const images = singlDetails.latestVersion.files.filter((_: any) => _.thumbnail_url);
              item.preview = images.map((_: any) => _.thumbnail_url)[0] || null;
              item.images = images.map((_: any) => _.download_url);
              item.labels = images.map((_: any) => _.label);
              item.detailsData = singlDetails;
            }
          });
          this.changeDetectorRef.detectChanges();
        });
      }

      this.DSService.newFiltersStructureSubject.next();
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
   * Toggle filters state
   *
   * @param {*} payload
   * @param {*} name
   * @memberof DatasetsComponent
   */
  toggleFilter(payload, name) {
    this.filters[name].isExpanded = payload;
    this.changeDetectorRef.detectChanges();
  }

  /**
   * @ignore
   *
   * @memberof DatasetsComponent
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
    this.store.dispatch(new DatasetsChangeViewMode('list'));
  }
}
