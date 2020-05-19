import { Component, Input, OnInit } from '@angular/core';

import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';

/**
 * Page Navigation Component
 */
@Component({
  selector: 'ofd-page-nav',
  templateUrl: 'page-nav.component.html',
  styleUrls: ['page-nav.component.scss']
})
export class PageNavComponent implements OnInit {
  /**
   * Breadcrumbs to render
   */
  @Input() breadcrumbs: IBreadcrumbs[];

  /**
   * @ignore
   */
  constructor() {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
