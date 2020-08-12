import { Component } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { HomeService, IContactForm } from '@app/pages/home/home.service';

/**
 * Contact modal content
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
   * Form field errors
   */
  public formError = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    text: ''
  };
  /**
   * Creates an instance of HomeContactFormComponent.
   * @param {UIModalService} modal UI Modal Service
   * @param {HomeService} homeService Home Service
   * @memberof HomeContactFormComponent
   */
  constructor(public modal: UIModalService, private homeService: HomeService) {}
  /**
   * Close modal window
   *
   * @memberof HomeContactFormComponent
   */
  closeModal() {
    this.modal.close('contact-modal');
    this.form = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      checkbox: '',
      text: ''
    };
    this.formError = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      text: ''
    };
  }

  /**
   * Submitting form
   *
   * @memberof HomeContactFormComponent
   */
  submitForm() {
    const payload: IContactForm = {
      name: this.form.firstName,
      last_name: this.form.lastName,
      e_mail: this.form.emailAddress,
      content: this.form.text,
      recaptcha_response: 'test'
    };

    this.homeService.sendContactForm(payload).subscribe(
      () => {
        alert('Pomyślnie wysłano wiadomość');
        this.closeModal();
      },
      error => {
        this.formError.emailAddress = error.error.e_mail;
      }
    );
  }
}
