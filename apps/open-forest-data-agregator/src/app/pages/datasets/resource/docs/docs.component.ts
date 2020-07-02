import { Component, OnInit, Input } from '@angular/core';

/**
 * Docs component
 */
@Component({
  selector: 'ofd-agregator-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  /**
   * Resource file
   */
  @Input() resource;

  /**
   * Docs constructor
   */
  constructor() {}

  /**
   * Initialize on start
   */
  ngOnInit() {}
}
