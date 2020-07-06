import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/**
 * Category filters
 *
 * @export
 * @class DatasetsCategoryComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-datasets-category',
  templateUrl: './datasets-category.component.html',
  styleUrls: ['./datasets-category.component.scss']
})
export class DatasetsCategoryComponent {
  /**
   * Categories
   *
   * @type {{ name: string; value: any }[]}
   * @memberof DatasetsCategoryComponent
   */
  @Input() categories: { name: string; value: any }[];

  /**
   * Active category
   *
   * @type {*}
   * @memberof DatasetsCategoryComponent
   */
  @Input() selectedCategory: any = null;

  /**
   * Event emmiter on currently active category change
   *
   * @type {EventEmitter<any>}
   * @memberof DatasetsCategoryComponent
   */
  @Output() selectedCategoryChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Set value for new category
   *
   * @param {*} value
   * @memberof DatasetsCategoryComponent
   */
  selectValue(value) {
    if (value !== this.selectedCategory) this.selectedCategoryChange.emit(value);
  }
}
