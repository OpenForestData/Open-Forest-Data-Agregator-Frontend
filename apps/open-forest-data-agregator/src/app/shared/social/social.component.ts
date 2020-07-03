import { Component, OnInit } from '@angular/core';
/**
 * Creates social links
 *
 * @export
 * @class SocialComponent
 */
@Component({
  selector: 'ofd-agregator-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  /**
   * Creates href for email which opens window for sending emails
   * @example
   * // returns mailto:?subject=ip_site;body=ip_site
   */
  setEmail() {
    return `mailto:?subject=${encodeURIComponent(`${window.location}`)};body=${encodeURIComponent(
      `${window.location}`
    )}`;
  }

  /**
   * Creates href for facebook share window
   * @example
   * // returns https://www.facebook.com/sharer/sharer.php?u=ip_site
   */
  setFBLink() {
    return `https://www.facebook.com/sharer/sharer.php?u=${window.location}`;
  }

  /**
   * Creates href for twitter share window
   * @example
   * // returns http://twitter.com/share?url=ip_site
   */
  setTwitterLink() {
    return `http://twitter.com/share?url=${window.location}`;
  }
}
