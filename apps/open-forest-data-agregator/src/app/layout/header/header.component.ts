import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
import { DOCUMENT } from '@angular/common';

/**
 * Header Component
 */
@Component({
  selector: 'ofd-header',
  styleUrls: ['header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public showMobileMenu = false;
  public collapseHeader = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toogleBar();
  }

  toogleBar() {
    const scrollTop = this.document.documentElement.scrollTop;
    this.collapseHeader = scrollTop > 60;
  }

  /**
   * @ignore
   */
  constructor(@Inject(DOCUMENT) private document: Document, public DSService: DatasetsService) {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
