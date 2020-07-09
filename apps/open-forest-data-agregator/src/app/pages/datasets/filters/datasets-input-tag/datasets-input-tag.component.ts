import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
/**
 * Input filter with option to add tags
 *
 * @export
 * @class DatasetsInputTagComponent
 */
@Component({
  selector: 'ofd-agregator-datasets-input-tag',
  templateUrl: './datasets-input-tag.component.html',
  styleUrls: ['./datasets-input-tag.component.scss']
})
export class DatasetsInputTagComponent {
  /**
   * Values for filter
   * I.e. for Select OR Autocomplete
   *
   * @type {any[]}
   * @memberof DatasetsFilterComponent
   */
  @Input() data: any[] = [];

  /**
   * Current value
   *
   * @type {*}
   * @memberof DatasetsFilterComponent
   */
  @Input() value: any = null;

  /**
   * Has filter multiple options
   *
   * @memberof DatasetsFilterComponent
   */
  @Input() multiple = true;

  /**
   * Event emmiter for value change
   *
   * @memberof DatasetsFilterComponent
   */
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Emit value manualy
   *
   * @param {*} payload
   * @memberof DatasetsFilterComponent
   */
  emitValue(value) {
    this.valueChange.emit(this.value);
  }
}
