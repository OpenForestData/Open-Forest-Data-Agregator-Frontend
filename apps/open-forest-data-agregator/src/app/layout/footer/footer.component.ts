import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/**
 * Footer Component
 *
 * @export
 * @class FooterComponent
 */
@Component({
  selector: 'ofd-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent {
  /**
   * Footer constructor
   * @param {CookieService} cookieService Cookie Service
   */
  constructor(public cookieService: CookieService) {}

  /**
   * Set cookie for cookie acceptance
   */
  acceptAndSetCookies() {
    this.cookieService.set('cookie-accept', 'true');
  }

  /**
   * Get cookie for cookie acceptance
   */
  getAcceptCookie() {
    return this.cookieService.get('cookie-accept');
  }
}
