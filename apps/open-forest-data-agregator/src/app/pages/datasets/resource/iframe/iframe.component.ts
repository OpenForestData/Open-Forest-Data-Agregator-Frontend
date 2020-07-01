import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Resource IFrame component
 */
@Component({
  selector: 'ofd-agregator-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {
  /**
   * Type of file
   */
  @Input() type;
  /**
   * Resource file
   */
  @Input() resource;
  /**
   * Type of viewer
   */
  @Input() viewerType;
  /**
   * Holder for IFrame URL
   */
  iframeUrl;
  /**
   * Sanitized link
   */
  sanitizedLink;
  /**
   * External site site URL
   */
  readonly EXTERNAL_URL: string = 'https://data-epuszcza.biaman.pl/';
  /**
   * Dataverse site URL
   */
  readonly DATAVERSE_URL: string = 'https://data-epuszcza.biaman.pl';

  /**
   * IFrame constructor
   * @param {DomSanitizer} sanitizer Sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Function that initialize at the start of website loading. Creates santinized link.
   */
  ngOnInit() {
    this.sanitizedLink = this.joinAndSanitize();
  }

  /**
   * Creates iframe URL from EXTERNAL URL and dataset details.
   * @example
   * joinAndSanitize()
   * // returns https://data-epuszcza.biaman.pl/tools/3dViewer.html?siteUrl=https://data-epuszcza.biaman.pl&fileid=73&datasetid=70&datasetversion=1
   */
  joinAndSanitize() {
    const iframeUrl = `${this.EXTERNAL_URL}tools/${this.viewerType}.html?siteUrl=${this.DATAVERSE_URL}&fileid=${this.resource.details?.identifier}&datasetid=${this.resource.dataset_details?.id}&datasetversion=${this.resource.dataset_details?.latestVersion.versionNumber}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
  }
}
