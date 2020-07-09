import { Component, Input, OnInit } from '@angular/core';

import { IBreadcrumbs } from '@app/interfaces/breadcrumbs';

/**
 * Page Navigation Component
 *
 * @export
 * @class PageNavComponent
 */
@Component({
  selector: 'ofd-page-nav',
  templateUrl: 'page-nav.component.html',
  styleUrls: ['page-nav.component.scss']
})
export class PageNavComponent {
  /**
   * Breadcrumbs to render
   */
  @Input() breadcrumbs: IBreadcrumbs[];
}
