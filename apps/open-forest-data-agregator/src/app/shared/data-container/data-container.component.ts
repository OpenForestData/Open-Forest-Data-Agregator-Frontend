import { Component, Input } from '@angular/core';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
/**
 * Creates collapsable container for datasets metrics
 *
 * @export
 * @class DataContainerComponent
 * @extends {HeaderBarComponent}
 */
@Component({
  selector: 'ofd-agregator-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss']
})
export class DataContainerComponent extends HeaderBarComponent {
  /**
   * Title of section
   *
   * @type {string}
   * @memberof DataContainerComponent
   */
  @Input() title: string;
}
