import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfigService } from '@app/services/app-config.service';

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
   * // returns DATAVERSE_URL/tools/3dViewer.html?siteUrl=DATAVERSE_URL&fileid=73&datasetid=70&datasetversion=1
   */
  joinAndSanitize() {
    const iframeUrl = `${AppConfigService.config.dataverseURL}/tools/${this.viewerType}.html?siteUrl=${AppConfigService.config.dataverseURL}&fileid=${this.resource.details?.identifier}&datasetid=${this.resource.dataset_details?.id}&datasetversion=${this.resource.dataset_details?.latestVersion.versionNumber}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
  }
}
