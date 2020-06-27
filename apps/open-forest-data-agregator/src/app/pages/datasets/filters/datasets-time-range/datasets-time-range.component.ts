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
    unSelectOnClick: false,
    firstDayOfWeek: 'mo'
  };

  constructor(public cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  changeDate(payload, index) {
    this.valueChange.emit(this.value);
  }
}
