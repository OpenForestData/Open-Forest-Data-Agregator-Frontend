import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-filter',
  templateUrl: './datasets-filter.component.html',
  styleUrls: ['./datasets-filter.component.scss']
})
export class DatasetsFilterComponent implements OnInit {
  @Input() header: string;

  @Input() key: string;

  @Input() data: any[];

  @Input() isExpanded: boolean;

  @Input() value: any = null;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  changeFilter(event, value) {
    this.value = event ? [...this.value, value] : this.value.filter(val => val !== value);
  }
}
