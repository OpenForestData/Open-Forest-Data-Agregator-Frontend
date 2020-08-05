import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

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
   */
  constructor(public cookieService: CookieService) {}

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
}
