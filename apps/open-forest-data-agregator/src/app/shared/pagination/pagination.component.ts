import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

/**
 * Pagination component
 */
@Component({
  selector: 'od-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
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
   */
  constructor() {
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }

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
  }
}
