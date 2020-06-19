import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-category',
  templateUrl: './datasets-category.component.html',
  styleUrls: ['./datasets-category.component.scss']
})
export class DatasetsCategoryComponent implements OnInit {
  @Input() categories: { name: string; value: any }[];

  @Input() selectedCategory: any = null;

  @Output() selectedCategoryChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  selectValue(value) {
    if (value !== this.selectedCategory) this.selectedCategoryChange.emit(value);
  }
}
