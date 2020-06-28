import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-input-tag',
  templateUrl: './datasets-input-tag.component.html',
  styleUrls: ['./datasets-input-tag.component.scss']
})
export class DatasetsInputTagComponent implements OnInit {
  @Input() data: any[];

  @Input() value: any = null;

  @Input() multiple = true;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  emitValue(value) {
    this.valueChange.emit(this.value);
  }
}
