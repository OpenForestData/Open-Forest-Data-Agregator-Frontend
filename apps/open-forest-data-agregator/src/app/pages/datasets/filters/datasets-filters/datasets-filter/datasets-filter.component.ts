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

  @Input() multiple = true;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public showMore = false;

  public maxFilters = 4;

  public showAll = false;

  constructor() {}

  ngOnInit(): void {}

  changeFilter(event, value) {
    this.value = this.multiple ? (event ? [...this.value, value] : this.value.filter(val => val !== value)) : value;
    if (this.multiple) {
      this.showAll = this.value.length === this.data.length ? true : this.value.length === 0 ? false : this.showAll;
    }

    this.valueChange.emit(this.value);
  }

  toggleAllFilters() {
    if (!this.multiple) return;
    this.showAll = !this.showAll;
    this.value = this.showAll ? this.data.map(val => val.value) : [];
    this.valueChange.emit(this.value);
  }
}
