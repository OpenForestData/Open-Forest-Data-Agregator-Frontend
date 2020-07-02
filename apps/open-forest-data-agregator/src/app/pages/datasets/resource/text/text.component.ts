import { Component, OnInit, Input } from '@angular/core';

/**
 * Resource text component
 */
@Component({
  selector: 'ofd-agregator-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  /**
   * Resource file
   */
  @Input() resource;

  /**
   * Text constructor
   */
  constructor() {}

  /**
   * Initialize on start
   */
  ngOnInit() {}
}
