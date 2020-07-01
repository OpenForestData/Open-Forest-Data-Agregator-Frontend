import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ofd-agregator-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {
  @Input() type;
  @Input() resource;
  @Input() viewerType;
  iframeUrl;
  sanitizedLink;
  readonly EXTERNAL_URL: string = 'https://data-epuszcza.biaman.pl/';
  readonly DATAVERSE_URL: string = 'https://data-epuszcza.biaman.pl';

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
