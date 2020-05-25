import { Component, HostListener, Inject, OnInit, ViewChild, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/* tslint:disable */
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

@Component({
  selector: 'ofd-agregator-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {
  @ViewChild('backButton', { static: false }) public backButton;

  public showArrow = false;

  @HostListener('window:scroll', [])
  @debounce()
  onWindowScroll() {
    this.toggleArrow();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.toggleArrow();
  }

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) public platformId: string) {}

  ngOnInit(): void {}

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

  backToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
