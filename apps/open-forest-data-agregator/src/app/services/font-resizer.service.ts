import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

/**
 * Font resizer service
 */
@Injectable({
  providedIn: 'root'
})
export class FontResizeService {
  /**
   * Document font size
   */
  public size = 16;

  /**
   * Max document font size
   */
  public maxSize = 20.5;

  /**
   * Min document font size
   */
  public minSize = 14;

  /**
   * Font resizer step
   * @private
   */
  private step = 0.5;

  /**
   * Cookie name
   * @private
   */
  private cookieName = 'font-s';

  /**
   * Font resizer service
   * @param {string} platformId Platform ID
   * @param {CookieService} cookieService Cookie service
   */
  constructor(@Inject(PLATFORM_ID) public platformId: string, public cookieService: CookieService) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.cookieService.check(this.cookieName)) {
        this.size = Number(this.cookieService.get(this.cookieName));
      }
      this.setSize();
    }
  }

  /**
   * Increase document font
   */
  increaseFont() {
    if (this.size + this.step <= this.maxSize) {
      this.size = this.size + this.step;
      this.setSize();
      this.setCookie();
    }
  }

  /**
   * Decrease document font
   */
  decreaseFont() {
    if (this.size - this.step >= this.minSize) {
      this.size = this.size - this.step;
      this.setSize();
      this.setCookie();
    }
  }

  /**
   * Reset document font
   */
  removeSize() {
    this.size = 16;
    this.setSize();
    this.setCookie();
  }

  /**
   * Set font size cookie
   */
  setCookie() {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set(
        this.cookieName,
        String(this.size),
        365,
        '/',
        window.location.hostname,
        location.protocol === 'https:',
        location.protocol === 'https:' ? 'None' : 'Lax'
      );
    }
  }

  /**
   * Change document font size
   */
  setSize() {
    document.querySelector('html').style.fontSize = `${this.size}px`;
  }
}
