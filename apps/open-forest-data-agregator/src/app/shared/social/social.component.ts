import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
/**
 * Creates social links
 *
 * @export
 * @class SocialComponent
 */
@Component({
  selector: 'ofd-agregator-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialComponent {
  /**
   * Link
   */
  @Input() linkTo = '';

  /**
   * Creates href for email which opens window for sending emails
   * @example
   * // returns mailto:?subject=ip_site;body=ip_site
   */
  get email() {
    return `mailto:?subject=${encodeURIComponent(`${this.linkTo}`)};body=${encodeURIComponent(
      `${this.linkTo ? this.createLinkTo() : window.location}`
    )}`;
  }

  /**
   * Creates href for facebook share window
   * @example
   * // returns https://www.facebook.com/sharer/sharer.php?u=ip_site
   */
  get FBLink() {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.linkTo ? this.createLinkTo() : window.location}`;
  }

  /**
   * Creates href for twitter share window
   * @example
   * // returns http://twitter.com/share?url=ip_site
   */
  get twitterLink() {
    return `http://twitter.com/share?url=${this.linkTo ? this.createLinkTo() : window.location}`;
  }

  /**
   * Create external link from window
   */
  createLinkTo() {
    const url = window.location.toString();
    if (url.charAt(url.length - 1) === '/') {
      return url + this.linkTo;
    } else {
      return url + '/' + this.linkTo;
    }
  }
}
