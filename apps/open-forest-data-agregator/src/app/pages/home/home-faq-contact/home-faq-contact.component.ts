import { Component } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { UtilsService } from '@app/services/utils.service';
/**
 * FAQ view at home page
 *
 * @export
 * @class HomeFaqContactComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-home-faq-contact',
  templateUrl: './home-faq-contact.component.html',
  styleUrls: ['./home-faq-contact.component.scss', '../home.media.scss']
})
export class HomeFaqContactComponent {
  constructor(public utilService: UtilsService, public modal: UIModalService) {}
}
