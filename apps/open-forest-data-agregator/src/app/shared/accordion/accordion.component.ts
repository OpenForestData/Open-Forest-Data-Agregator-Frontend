import { Component, Input } from '@angular/core';
/**
 * Accordion component
 *
 * @export
 * @class AccordionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  /**
   * Array of tabs content
   *
   * @memberof AccordionComponent
   */
  @Input() accordionContent = [];

  /**
   * Current active tab. -1 === None
   *
   * @memberof AccordionComponent
   */
  public activeAccordion = -1;
}
