import { Component, HostListener, Inject, OnInit, ViewChild, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/* tslint:disable */
/**
 * Debounce function
 */
export function debounce(delay: number = 100): MethodDecorator {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const timeoutKey = Symbol();

    const original = descriptor.value;

    descriptor.value = function(...args) {
      clearTimeout(this[timeoutKey]);
      this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
/**
 * Back to top arrow, show only when scroll is at bottom of page
 *
 * @export
 * @class BackToTopComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent {
  /**
   * View referenece to button
   *
   * @memberof BackToTopComponent
   */
  @ViewChild('backButton', { static: false }) public backButton;

  /**
   * Is button visible
   *
   * @memberof BackToTopComponent
   */
  public showArrow = false;

  /**
   * Callback for page scrolling
   * Valids arrow visiblity condition
   */
  @HostListener('window:scroll', [])
  @debounce()
  onWindowScroll() {
    this.toggleArrow();
  }

  /**
   * Callback for page resize
   * Valids arrow visiblity condition
   */
  @HostListener('window:resize', [])
  onWindowResize() {
    this.toggleArrow();
  }

  /**
   * @ignore
   * @param {Document} document
   * @param {string} platformId
   * @memberof BackToTopComponent
   */
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) public platformId: string) {}

  /**
   * Check if scroll is at bottom of page
   * If True show button Else hide it
   *
   * @memberof BackToTopComponent
   */
  toggleArrow() {
    const scrollTop = this.document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    this.showArrow = scrollTop > innerHeight;

    if (isPlatformBrowser(this.platformId)) {
      if (this.showArrow) {
        this.backButton.nativeElement.style.visibility = 'visible';
      } else {
        setTimeout(() => {
          this.backButton.nativeElement.style.visibility = 'hidden';
        }, 300);
      }
    }
  }

  /**
   * Callback for button click
   * Scroll page to the top
   *
   * @memberof BackToTopComponent
   */
  backToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
