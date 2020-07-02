import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/**
 * Collapsable header
 *
 * @export
 * @class HeaderBarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {
  /**
   * Icon URL
   *
   * @type {string}
   * @memberof HeaderBarComponent
   */
  @Input() iconSrc: string;

  /**
   * If collapsable
   *
   * @type {boolean}
   * @memberof HeaderBarComponent
   */
  @Input() expandable: boolean;

  /**
   * Collapsed/Expanded state
   *
   * @type {boolean}
   * @memberof HeaderBarComponent
   */
  @Input() expanded: boolean;

  /**
   * State emitter for collapse changed
   *
   * @type {EventEmitter<any>}
   * @memberof HeaderBarComponent
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Toogle fn
   *
   * @memberof HeaderBarComponent
   */
  onToggle() {
    this.expanded = !this.expanded;
    this.toggle.emit(this.expanded);
  }
}
