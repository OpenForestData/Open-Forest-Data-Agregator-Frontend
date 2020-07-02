import { Component, OnInit, Input } from '@angular/core';

/**
 * Resource JSON component
 */
@Component({
  selector: 'ofd-agregator-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {
  /**
   * Resource file
   */
  @Input() resource;

  /**
   * JSON constructor
   */
  constructor() {}

  /**
   * Initialize on start
   */
  ngOnInit() {}
}
