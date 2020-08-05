import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FontResizeService } from '@app/services/font-resizer.service';

/**
 * WCAG Control buttons
 */
@Component({
  selector: 'ofd-agregator-header-controls',
  templateUrl: './header-controls.component.html',
  styleUrls: ['./header-controls.component.scss']
})
export class HeaderControlsComponent {
  /**
   * Contrast bool
   */
  public isContrast = false;

  /**
   * Constructor
   * @param {CookieService} cookieService Cookie service
   * @param {FontResizeService} fontResizer Font resizer service
   */
  constructor(public cookieService: CookieService, public fontResizer: FontResizeService) {}

  /**
   * Turn on/off contrast for WCGI
   */
  public setContrast() {
    this.isContrast = !this.isContrast;
    if (this.isContrast) {
      document.querySelector('body').classList.add('wcag-contrast');
    } else {
      document.querySelector('body').classList.remove('wcag-contrast');
    }
    this.cookieService.set(
      'wcag',
      String(this.isContrast),
      365,
      '/',
      window.location.hostname,
      location.protocol === 'https:',
      'None'
    );
  }

  /**
   * Increase body font
   */
  public increaseFont() {
    this.fontResizer.increaseFont();
  }

  /**
   * Decrease body font
   */
  public decreaseFont() {
    this.fontResizer.decreaseFont();
  }

  /**
   * Reset body font
   */
  public resetFont() {
    this.fontResizer.removeSize();
  }
}
