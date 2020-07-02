import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

/**
 * Social component
=======
/**
 * Creates social links
 *
 * @export
 * @class SocialComponent
>>>>>>> Shared
 */
@Component({
  selector: 'ofd-agregator-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
<<<<<<< HEAD
export class SocialComponent implements OnInit {
  /**
   * Social constructor
   */
  constructor() {}

  /**
   * Initialize on start
   */
  ngOnInit() {}

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
=======
export class SocialComponent {
  /**
   * URLs for social links
   *
   * @type {{
   *     fbLink: string;
   *     instaLink: string;
   *     twitterLink: string;
   *     emailLink: string;
   *   }}
   * @memberof SocialComponent
   */
  public links: {
    fbLink: string;
    instaLink: string;
    twitterLink: string;
    emailLink: string;
  } = {
    fbLink: 'https://whiteaster.com/',
    instaLink: 'https://whiteaster.com/',
    twitterLink: 'https://whiteaster.com/',
    emailLink: 'https://whiteaster.com/'
  };
>>>>>>> Shared
}
