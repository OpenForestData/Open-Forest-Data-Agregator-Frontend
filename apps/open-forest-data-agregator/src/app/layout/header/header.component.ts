import { Component, HostListener, Inject } from '@angular/core';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { DOCUMENT } from '@angular/common';
/**
 * Application header section
 *
 * @export
 * @class HeaderComponent
 */
@Component({
  selector: 'ofd-header',
  styleUrls: ['header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /**
   * Show mobile menu
   *
   * @memberof HeaderComponent
   */
  public showMobileMenu = false;
  /**
   * Shorten header when scroll is not at top
   *
   * @memberof HeaderComponent
   */
  public collapseHeader = false;

  /**
   * Listen to page scroll
   *
   * @memberof HeaderComponent
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toogleBar();
  }

  /**
   * Check if scroll if at the Top
   * If not collapse header
   *
   * @memberof HeaderComponent
   */
  toogleBar() {
    const scrollTop = this.document.documentElement.scrollTop;
    this.collapseHeader = scrollTop > 60;
  }

  /**
   * @ignore
   */
  constructor(@Inject(DOCUMENT) private document: Document, public DSService: DatasetsService) {}
}
