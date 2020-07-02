import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-time-range',
  templateUrl: './datasets-time-range.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./datasets-time-range.component.scss']
})
export class DatasetsTimeRangeComponent implements OnInit {
  @Input() data: any[];

  @Input() value: any = null;

  @Input() multiple = true;

  @Input() single = false;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public datePickerConfig = {
    locale: 'pl-PL',
    disableKeypress: true,
    unSelectOnClick: true,
    closeOnSelect: true,
    enableMonthSelector: true,
    showMultipleYearsNavigation: true,
    firstDayOfWeek: 'mo',
    hideOnOutsideClick: false,
    dayBtnCssClassCallback: () => {},
    monthBtnCssClassCallback: () => {},
    onSelect: () => {}
  };

  constructor() {}

  ngOnInit(): void {}

  changeDate(payload, index) {
    if (this.single) {
      this.valueChange.emit(this.value);
    }

    if (!this.single && this.value[0] && this.value[1]) {
      this.valueChange.emit(this.value);
    }
  }
}
