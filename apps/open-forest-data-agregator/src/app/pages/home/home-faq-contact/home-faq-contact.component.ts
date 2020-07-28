import { Component } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { UtilsService } from '@app/services/utils.service';
/**
 * FAQ view at home page
 */
@Component({
  selector: 'ofd-agregator-home-faq-contact',
  templateUrl: './home-faq-contact.component.html',
  styleUrls: ['./home-faq-contact.component.scss', '../home.media.scss']
})
export class HomeFaqContactComponent {
  /**
   * Home FAQ Component constructor
   * @param {UtilsService} utilService Utils service
   * @param {UIModalService} modal UI Modal service
   */
  constructor(public utilService: UtilsService, public modal: UIModalService) {}
}
