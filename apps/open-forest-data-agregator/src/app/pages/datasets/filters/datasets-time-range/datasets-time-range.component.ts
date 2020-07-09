import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { IDatePickerConfig } from 'ng2-date-picker';
/**
 * Time range filter
 *
 * @export
 * @class DatasetsTimeRangeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-datasets-time-range',
  templateUrl: './datasets-time-range.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./datasets-time-range.component.scss']
})
export class DatasetsTimeRangeComponent {
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
   * Define whatever filter is visible
   *
   * @type {boolean}
   * @memberof DatasetsRangeComponent
   */
  @Input() isExpanded: boolean;

  /**
   * If single date picker or range picker
   *
   * @memberof DatasetsTimeRangeComponent
   */
  @Input() single = false;

  /**
   * Event emmiter for value change
   *
   * @memberof DatasetsFilterComponent
   */
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Datepicker config
   *
   * @memberof DatasetsTimeRangeComponent
   */
  public datePickerConfig: IDatePickerConfig = {
    locale: 'pl-PL',
    disableKeypress: true,
    unSelectOnClick: true,
    closeOnSelect: true,
    enableMonthSelector: true,
    showMultipleYearsNavigation: true,
    firstDayOfWeek: 'mo',
    hideOnOutsideClick: false
  };

  /**
   * Emit events on valid date change
   *
   * @param {*} payload
   * @param {*} index
   * @memberof DatasetsTimeRangeComponent
   */
  changeDate(payload, index) {
    if (this.single) {
      this.valueChange.emit(this.value);
    }

    if (!this.single && this.value[0] && this.value[1]) {
      this.valueChange.emit(this.value);
    }
  }
}
