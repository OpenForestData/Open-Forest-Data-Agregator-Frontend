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
    this.DSService.searchFilters = { field: 'category', data: value };
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

  /**
   * @ignore
   */
  ngOnInit() {
    this.getData();
  }

  paginationChanged(payload) {
    this.DSService.searchFilters = { field: 'start', data: payload.page };
    this.DSService.searchFilters = { field: 'rows', data: payload.limit };
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

        return {
          id: item.id,
          datasetPersistentID: item.dsPersistentId,
          title: item.title,
          identifier: item.identifier,
          identifier64: btoa(item.identifier),
          createdAt: '',
          author: item.authorName ? item.authorName.join(', ') : '',
          category: item.dvName,
          source: 'Dataverse',
          preview: 'wait',
          files: [],
          images: [],
          subject: item.subject ? item.subject.join(', ') : '',
          coordinates: [
            {
              lat: 50.2137612,
              long: 18.9371533
            }
          ],
          description: item.dsDescriptionValue ? item.dsDescriptionValue.join(', ') : ''
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
              item.images = singlDetails.latestVersion.files
                .filter((_: any) => _.thumbnail_url)
                .map((_: any) => _.thumbnail_url);
              item.preview = item.images[0] || null;
            }
          });
          this.changeDetectorRef.detectChanges();
        });
      }

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
