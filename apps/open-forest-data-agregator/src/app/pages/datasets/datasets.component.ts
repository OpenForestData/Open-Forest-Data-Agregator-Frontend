import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { datasetsMock, categoriesMock } from '@app/pages/datasets/datasets.mock';
import { AppState } from '@app/store';
import { DatasetsChangeViewMode } from '@app/store/datasets/datasets.actions';
import { DatasetsService } from './datasets.service';

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
  public breadcrumbs: IBreadcrumbs[] = [
    { name: 'Start', href: '/' },
    { name: 'Zbiory danych', href: '/datasets' }
  ];

  public fullscreen = false;
  public pageCount = 0;

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
  public page = 1;

  /**
   * Datasets data from store
   */
  public datasets: any;

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

  setCategory(value) {
    this.DSService.searchFilters = { field: 'category', data: value, search: true };
  }

  public get selectedCategory() {
    return this.DSService.searchFilters.data.category;
  }

  public get categories() {
    const filter = this.DSService.searchData.list.available_filter_fields;

    return filter['category']
      ? Object.keys(filter['category']).map(key =>
          Object.create({ name: filter['category'][key].friendly_name, value: filter['category'][key].name })
        )
      : [];
  }

  public get pageSize() {
    return this.DSService.searchFilters.data.rows;
  }

  /**
   * @ignore
   */
  ngOnInit() {
    this.getData();

    this.DSService.resetFilters();
  }

  setFullscreen(value) {
    this.fullscreen = value;
  }

  paginationChanged(payload) {
    this.DSService.searchFilters = { field: 'start', data: payload.page, search: true };
    this.DSService.searchFilters = { field: 'rows', data: payload.limit, search: true };
  }

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
          dwcGenus: item.dwcGenus
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

  toggleFilter(payload, name) {
    this.filters[name].isExpanded = payload;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();

    this.store.dispatch(new DatasetsChangeViewMode('list'));
  }
}
