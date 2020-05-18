import { Component, OnInit } from '@angular/core';

/**
 * Home Component
 */
@Component({
  selector: 'od-home',
  templateUrl: './home.component.html',
  styles: [
    `
            od-home-slider {
                position: relative;
                display: block;
            }
        `
  ]
})
export class HomeComponent implements OnInit {
  /**
   * @ignore
   */
  constructor() {
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }
}
