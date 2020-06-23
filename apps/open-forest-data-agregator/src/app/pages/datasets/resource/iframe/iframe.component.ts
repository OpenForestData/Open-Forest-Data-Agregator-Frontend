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

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    console.log('resource iframe: ', this.resource);
    this.sanitizedLink = this.joinAndSanitize();
  }

  joinAndSanitize() {
    const iframeUrl = `${this.EXTERNAL_URL}tools/${this.viewerType}.html?siteUrl=${this.EXTERNAL_URL}&fileid=${this.resource.dataset_details?.id}&datasetid=${this.resource.details?.identifier}&datasetversion=${this.resource.dataset_details?.latestVersion.versionNumber}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
  }
}
