import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-time-range',
  templateUrl: './datasets-time-range.component.html',
  styleUrls: ['./datasets-time-range.component.scss']
})
export class DatasetsTimeRangeComponent implements OnInit {
  @Input() header: string;

  @Input() key: string;

  @Input() data: any[];

  @Input() isExpanded: boolean;

  @Input() value: any = null;

  @Input() multiple = true;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
