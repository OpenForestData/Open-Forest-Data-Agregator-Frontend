import { Component } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';

// TODO - Kontakt do spięcia, dorobienie captchy
/**
 * Contact modal content
 *
 * @export
 * @class HomeContactFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-home-contact-form',
  templateUrl: './home-contact-form.component.html',
  styleUrls: ['./home-contact-form.component.scss', '../home.media.scss']
})
export class HomeContactFormComponent {
  /**
   * Holds form data
   *
   * @memberof HomeContactFormComponent
   */
  public form = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    text: '',
    checkbox: ''
  };
  /**
   * Creates an instance of HomeContactFormComponent.
   * @param {UIModalService} modal
   * @memberof HomeContactFormComponent
   */
  constructor(public modal: UIModalService) {}
  /**
   * Close modal window
   *
   * @memberof HomeContactFormComponent
   */
  closeModal() {
    this.modal.close('contact-modal');
  }

  /**
   * Submitting form
   *
   * @memberof HomeContactFormComponent
   */
  submitForm() {}
}
