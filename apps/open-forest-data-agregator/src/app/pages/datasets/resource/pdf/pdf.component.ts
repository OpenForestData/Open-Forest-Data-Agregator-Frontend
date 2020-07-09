import { Component, OnInit, Input } from '@angular/core';

/**
 * Resource PDF component
 */
@Component({
  selector: 'ofd-agregator-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  /**
   * Resource file
   */
  @Input() resource;

  /**
   * PDF constructor
   */
  constructor() {}

  /**
   * Initialize on start
   */
  ngOnInit() {}
}
