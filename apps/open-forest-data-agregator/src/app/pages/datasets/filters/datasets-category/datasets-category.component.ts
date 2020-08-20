import { Component, EventEmitter, Input, Output } from '@angular/core';
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
   */
  @Input() categories: { name: string; value: any }[];

  /**
   * Active category
   */
  @Input() selectedCategory: any = null;

  /**
   * Event emitter on currently active category change
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
