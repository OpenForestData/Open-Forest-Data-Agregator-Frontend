import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

/**
 * Generate pagination
 *
 * @export
 * @class PaginationComponent
 * @implements {OnChanges}
 */
@Component({
  selector: 'ofd-agregator-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  /**
   * Number of items on page
   */
  @Input() pageSize: number;
  /**
   * Number of all items
   */
  @Input() items: number;
  /**
   * Current page
   */
  @Input() page: number;
  /**
   * Pagination offset
   */
  @Input() offset = 2;
  /**
   * Show pagination offset
   */
  @Input() showOffsets = false;
  /**
   * Emit event when page was changed
   */
  @Output() pageChange = new EventEmitter();

  /**
   * Emiter for changes. Working outside pageChange( page value changed )
   *
   * @memberof PaginationComponent
   */
  @Output() changes = new EventEmitter();

  /**
   * Array of pages
   */
  public pagesArray: number[] = [];
  /**
   * Number of all pages
   */
  public pages: number;
  /**
   * Pagination start number
   */
  public start: number;
  /**
   * Pagination end number
   */
  public end: number;

  /**
   * @ignore
   *
   * @memberof PaginationComponent
   */
  public inputValue = 1;

  /**
   * Rerender pagination on every change
   */
  ngOnChanges() {
    this.rerender();
  }

  /**
   * Calculate pages and pagination offset
   */
  rerender(): void {
    this.pagesArray = [];
    this.pages = Math.ceil(this.items / this.pageSize);
    this.start = this.page > this.offset ? this.page - this.offset : 1;
    this.end = this.page + this.offset > this.pages ? this.pages : this.page + this.offset;

    for (let i = this.start; i <= this.end; i++) {
      this.pagesArray.push(i);
    }
  }

  /**
   * Change page and emit change to parent
   * @param {number} page Page
   */
  pageClick(page: number) {
    this.pageChange.emit(page);
    this.page = page;
    this.emitChanges(this.pageSize);
  }

  /**
   * Emit events of page change after time passes from last key up.
   * Debouce page input.
   *
   * @param {number} newPage
   * @memberof PaginationComponent
   */
  debouncePage(newPage: number) {
    newPage = Number(newPage);
    if (Number.isInteger(newPage) && newPage > 0) {
      if (newPage > this.pages) newPage = this.pages;

      this.pageClick(newPage);
    } else {
      this.inputValue = this.page;
    }
  }

  /**
   * Emit page change via emiter
   *
   * @param {*} pageSize
   * @memberof PaginationComponent
   */
  emitChanges(pageSize) {
    this.page = 1;
    this.inputValue = this.page;

    this.changes.emit({
      page: this.page,
      limit: pageSize
    });
  }
}
