import { Component, OnInit } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';

/**
 * Home Component
 */
@Component({
  selector: 'ofd-home',
  templateUrl: './home.component.html',
  styles: [
    `
      ofd-home-slider {
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
  constructor(public modal: UIModalService) {}

  /**
   * @ignore
   */
  ngOnInit() {}

  onModalClose() {
    this.modal.close('contact-modal');
  }
}
