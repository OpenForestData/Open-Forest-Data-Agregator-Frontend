import { Component, OnInit } from '@angular/core';

import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';
import { TranslateService } from '@ngx-translate/core';

/**
 * Datasets Component
 */
@Component({
  selector: 'ofd-datasets',
  templateUrl: 'datasets.component.html',
  styleUrls: ['datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
  public breadcrumbs: IBreadcrumbs[] = [
    { name: 'Start', href: '/' },
    { name: 'Zbiory danych', href: '/datasets' }
  ];

  /**
   * @ignore
   */
  constructor(public translateService: TranslateService) {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
