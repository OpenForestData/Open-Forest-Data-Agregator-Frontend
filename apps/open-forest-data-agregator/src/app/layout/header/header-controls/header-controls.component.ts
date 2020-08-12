import { Component, OnInit } from '@angular/core';
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
export class HeaderControlsComponent implements OnInit {
  /**
   * Contrast bool
   */
  public isContrast;

  /**
   * Constructor
   * @param {CookieService} cookieService Cookie service
   * @param {FontResizeService} fontResizer Font resizer service
   */
  constructor(public cookieService: CookieService, public fontResizer: FontResizeService) {}

  /**
   * Check if wcag cookie exists and has 'true' value and set contrast
   */
  ngOnInit() {
    this.isContrast = this.cookieService.check('wcag') ? this.cookieService.get('wcag') === 'true' : false;
    this.setContrast();
  }

  /**
   * Set contrast class and cookie for WCGI
   */
  public setContrast() {
    if (this.isContrast) {
      document.querySelector('body').classList.add('wcag-contrast');
      this.cookieService.set(
        'wcag',
        String(this.isContrast),
        365,
        '/',
        window.location.hostname,
        location.protocol === 'https:',
        'None'
      );
    } else {
      document.querySelector('body').classList.remove('wcag-contrast');
      this.cookieService.delete('wcag', '/', window.location.hostname);
    }
  }

  /**
   * Change contrast
   */
  public changeContrast() {
    this.isContrast = !this.isContrast;
    this.setContrast();
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
