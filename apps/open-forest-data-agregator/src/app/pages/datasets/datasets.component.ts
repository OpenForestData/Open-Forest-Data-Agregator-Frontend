import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { TranslateService } from '@ngx-translate/core';
import { datasetsMock } from '@app/pages/datasets/datasets.mock';

/**
 * Datasets Component
 */
@Component({
  selector: 'ofd-datasets',
  templateUrl: 'datasets.component.html',
  styleUrls: ['datasets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetsComponent implements OnInit {
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

  public categories = [
    { name: 'Kolekcja zoologiczna IBS PAN', value: 0 },
    { name: 'Kolekcja roślin naczyniowych INL PB', value: 1 },
    { name: 'Kolekcja owadów saproksylicznych', value: 2 },
    { name: 'Kolekcja grzybów INL PB', value: 3 },
    { name: 'Kolekcja grzybów INL PB', value: 4 },
    { name: 'Kolekcja ptaków', value: 5 },
    { name: 'Mapy', value: 6 },
    { name: 'Fotopułapki', value: 7 },
    { name: 'Dane meteorologiczne', value: 8 },
    { name: 'Śledzenie zwierząt', value: 9 },
    { name: 'Bazy danych IBS PAN', value: 10 },
    { name: 'Bazy danych INL PB', value: 11 }
  ];

  public datasets = datasetsMock;

  /**
   * @ignore
   */
  constructor(public translateService: TranslateService, public changeDetectorRef: ChangeDetectorRef) {}

  /**
   * @ignore
   */
  ngOnInit() {}

  toggleFilter(name) {
    this.filters[name].isExpanded = !this.filters[name].isExpanded;
    this.changeDetectorRef.detectChanges();
  }
}
