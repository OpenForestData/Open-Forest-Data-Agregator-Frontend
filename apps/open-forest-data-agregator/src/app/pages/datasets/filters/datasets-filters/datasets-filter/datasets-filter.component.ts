import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
/**
 * View of basic filter - on of few types
 *
 * @export
 * @class DatasetsFilterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-datasets-filter',
  templateUrl: './datasets-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./datasets-filter.component.scss']
})
export class DatasetsFilterComponent {
  /**
   * Header title
   *
   * @type {string}
   * @memberof DatasetsFilterComponent
   */
  @Input() header: string;

  /**
   * Type of filter to show
   *
   * @memberof DatasetsFilterComponent
   */
  @Input() type = 'SELECT';

  /**
   * Filter unique key
   *
   * @type {string}
   * @memberof DatasetsFilterComponent
   */
  @Input() key: string;

  /**
   * Values for filter
   * I.e. for Select OR Autocomplete
   *
   * @type {any[]}
   * @memberof DatasetsFilterComponent
   */
  @Input() data: any[] = [];

  /**
   * Is filter collapsed or expanded
   *
   * @type {boolean}
   * @memberof DatasetsFilterComponent
   */
  @Input() isExpanded: boolean;

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
   * Event emitter for value change
   *
   * @memberof DatasetsFilterComponent
   */
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * If show more option is active
   *
   * @memberof DatasetsFilterComponent
   */
  public showMore = false;

  /**
   * Max number of options before collapse rest
   *
   * @memberof DatasetsFilterComponent
   */
  public maxFilters = 4;

  /**
   * If check all or uncheck all options
   *
   * @memberof DatasetsFilterComponent
   */
  public showAll = false;

  /**
   * Fired on filter value changed ( Checkbox only )
   *
   * @param {*} event
   * @param {*} value
   * @memberof DatasetsFilterComponent
   */
  changeFilter(event, value) {
    this.value = this.multiple ? (event ? [...this.value, value] : this.value.filter(val => val !== value)) : value;
    if (this.multiple) {
      this.showAll = this.value.length === this.data.length ? true : this.value.length === 0 ? false : this.showAll;
    }

    this.valueChange.emit(this.value);
  }

  /**
   * Check/Uncheck all checkboxes
   *
   * @returns
   * @memberof DatasetsFilterComponent
   */
  toggleAllFilters() {
    if (!this.multiple) return;
    this.showAll = !this.showAll;
    this.value = this.showAll ? this.data : [];
    this.valueChange.emit(this.value);
  }

  /**
   * Emit value manually
   *
   * @param {*} payload
   * @memberof DatasetsFilterComponent
   */
  emitChange(payload) {
    this.valueChange.emit(payload);
  }
}
