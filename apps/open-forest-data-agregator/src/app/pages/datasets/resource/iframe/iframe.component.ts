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
  readonly EXAMPLE_URL: string =
    '3d: https://externaltools.whiteaster.com/tools/3dViewer.html?siteUrl=https://openforestdata.pl&fileid=43&datasetid=41&datasetversion=1.0';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    console.log('resource iframe: ', this.resource);
    this.sanitizedLink = this.joinAndSanitize();
  }

  joinAndSanitize() {
    const iframeUrl = `${this.EXTERNAL_URL}tools/${this.viewerType}.html?siteUrl=${this.DATAVERSE_URL}&fileid=${this.resource.details?.identifier}&datasetid=${this.resource.dataset_details?.id}&datasetversion=${this.resource.dataset_details?.latestVersion.versionNumber}`;
    console.log('iframe url: ', iframeUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
  }
}
