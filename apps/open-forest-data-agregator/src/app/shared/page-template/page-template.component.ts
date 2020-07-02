import { Component, Input } from '@angular/core';
/**
 * Template for generic page
 *
 * @export
 * @class PageTemplateComponent
 */
@Component({
  selector: 'ofd-agregator-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent {
  /**
   * Icon URL for title component
   *
   * @memberof PageTemplateComponent
   */
  @Input() iconURL = '';
  /**
   * Title of news for title component
   *
   * @memberof PageTemplateComponent
   */
  @Input() pageTitle = '';

  /**
   * Page content
   *
   * @memberof PageTemplateComponent
   */
  @Input() pageContent = ``;
}
