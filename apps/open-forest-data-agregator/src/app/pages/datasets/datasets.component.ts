import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { datasetsMock, categoriesMock } from '@app/pages/datasets/datasets.mock';
import { AppState } from '@app/store';
import { DatasetsChangeViewMode } from '@app/store/datasets/datasets.actions';

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
   * Mock categories
   */
  public categories = categoriesMock;

  /**
   * Mock datasets items
   */
  public datasetsItems = datasetsMock;

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
    private store: Store<AppState>
  ) {
    this.subs.add(this.store.select('datasets').subscribe(datasets => (this.datasets = datasets)));
  }

  /**
   * @ignore
   */
  ngOnInit() {}

  toggleFilter(name) {
    this.filters[name].isExpanded = !this.filters[name].isExpanded;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();

    this.store.dispatch(new DatasetsChangeViewMode('list'));
  }
}
