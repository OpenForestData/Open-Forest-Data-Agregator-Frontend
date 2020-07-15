import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';

/**
 * Filters for charts
 *
 * @export
 * @class ChartFiltersComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-chart-filters',
  templateUrl: './chart-filters.component.html',
  styleUrls: ['./chart-filters.component.scss']
})
export class ChartFiltersComponent implements OnInit {
  /**
   * If show date range filter
   *
   * @memberof ChartFiltersComponent
   */
  @Input() showRange = true;
  /**
   * Emitter for chart filters changed
   *
   * @type {EventEmitter<any>}
   * @memberof ChartFiltersComponent
   */
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();

  /**
   * Start date value
   *
   * @memberof ChartFiltersComponent
   */
  public startDate = '';

  /**
   * End date value
   *
   * @memberof ChartFiltersComponent
   */
  public endDate = '';

  /**
   * Start date datepicker config
   *
   * @memberof ChartFiltersComponent
   */
  public startDatePickerConfig = {
    locale: 'pl-PL',
    disableKeypress: true,
    unSelectOnClick: false,
    firstDayOfWeek: 'mo',
    format: 'DD-MM-yyyy'
  };

  /**
   * End date datepicker config
   *
   * @memberof ChartFiltersComponent
   */
  public endDatePickerConfig = {
    min: this.startDate,
    disableKeypress: true,
    unSelectOnClick: false,
    minDate: this.startDate,
    firstDayOfWeek: 'mo',
    locale: 'pl-PL',
    format: 'DD-MM-yyyy'
  };

  /**
   * Select options
   *
   * @memberof ChartFiltersComponent
   */
  public selectItems = [
    { name: 'stats.day', value: 'day' },
    { name: 'stats.month', value: 'month' },
    { name: 'stats.year', value: 'year' }
  ];

  /**
   * Current select value
   *
   * @memberof ChartFiltersComponent
   */
  public selectValue = this.selectItems[0];

  /**
   * UISelect config
   *
   * @type {IUISelectOptions}
   * @memberof ChartFiltersComponent
   */
  public options: IUISelectOptions = {
    placeholder: '',
    class: 'border-black'
  };

  /**
   * @ignore
   * @param {TranslateService} translate
   * @param {ChangeDetectorRef} cd
   * @memberof ChartFiltersComponent
   */
  constructor(public translate: TranslateService, public cd: ChangeDetectorRef) {}

  /**
   * Emit filters value
   *
   * @memberof ChartFiltersComponent
   */
  emitNewFilters() {
    this.endDatePickerConfig = {
      min: this.startDate,
      disableKeypress: true,
      unSelectOnClick: false,
      minDate: this.startDate,
      firstDayOfWeek: 'mo',
      locale: 'pl-PL',
      format: 'DD-MM-yyyy'
    };

    const d1 = Date.parse(this.startDate);
    const d2 = Date.parse(this.endDate);
    if (d1 > d2) {
      setTimeout(() => {
        this.endDate = this.startDate;
      }, 0);
    }

    this.filtersChanged.emit({
      startDate: this.startDate,
      endDate: this.endDate,
      selectValue: this.showRange ? this.selectValue : null
    });
  }

  /**
   * @ignore
   *
   * @memberof ChartFiltersComponent
   */
  ngOnInit() {
    this.selectItems.map((item, index) => {
      this.translate.get(item.name).subscribe(value => {
        this.selectItems[index].name = value;
      });
    });
  }
}
