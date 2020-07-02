import { Component, OnInit, Input } from '@angular/core';

/**
 * Resource xml component
 */
@Component({
  selector: 'ofd-agregator-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent implements OnInit {
  /**
   * Resource file
   */
  @Input() resource;

  /**
   * XML constructor
   */
  constructor() {}

  /**
   * Initialize on start
   */
  ngOnInit() {}
}
