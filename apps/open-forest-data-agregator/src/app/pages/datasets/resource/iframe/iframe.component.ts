import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ofd-agregator-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {
  @Input() iframeUrl;
  @Input() type;
  sanitizedLink;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sanitizedLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
  }
}
