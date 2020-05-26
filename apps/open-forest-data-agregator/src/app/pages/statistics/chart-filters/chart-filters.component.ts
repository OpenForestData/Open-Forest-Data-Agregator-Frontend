import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'ofd-agregator-chart-filters',
  templateUrl: './chart-filters.component.html',
  styleUrls: ['./chart-filters.component.scss']
})
export class ChartFiltersComponent implements OnInit {
  @Input() showRange = true;
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();

  public startDate = '';
  public endDate = '';

  public startDatePickerConfig = {
    locale: 'pl-PL',
    disableKeypress: true,
    unSelectOnClick: false,
    firstDayOfWeek: 'mo'
  };

  public endDatePickerConfig = {
    min: this.startDate,
    disableKeypress: true,
    unSelectOnClick: false,
    minDate: this.startDate,
    firstDayOfWeek: 'mo',
    locale: 'pl-PL'
  };

  public selectItems = [
    { name: 'stats.day', value: 'day' },
    { name: 'stats.month', value: 'month' },
    { name: 'stats.year', value: 'year' }
  ];

  public selectValue = this.selectItems[0];

  public options: IUISelectOptions = {
    placeholder: '',
    class: 'border-black'
  };

  constructor(public translate: TranslateService, public cd: ChangeDetectorRef) {}

  emitNewFilters() {
    this.endDatePickerConfig = {
      min: this.startDate,
      disableKeypress: true,
      unSelectOnClick: false,
      minDate: this.startDate,
      firstDayOfWeek: 'mo',
      locale: 'pl-PL'
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

  ngOnInit() {
    this.selectItems.map((item, index) => {
      this.translate.get(item.name).subscribe(value => {
        this.selectItems[index].name = value;
      });
    });
  }
}
