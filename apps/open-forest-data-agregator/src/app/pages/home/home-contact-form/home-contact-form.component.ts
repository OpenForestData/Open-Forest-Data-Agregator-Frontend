import { Component } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { HomeService, IContactForm } from '@app/pages/home/home.service';
import { AppConfigService } from '@app/services/app-config.service';

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
    checkbox: '',
    captcha: ''
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
   * Config
   */
  config: any;

  /**
   * Is captcha resolved
   */
  captchaResolved = false;

  /**
   * Creates an instance of HomeContactFormComponent.
   * @param {UIModalService} modal UI Modal Service
   * @param {HomeService} homeService Home Service
   * @param appConfigService App config service
   * @memberof HomeContactFormComponent
   */
  constructor(
    public modal: UIModalService,
    private homeService: HomeService,
    public appConfigService: AppConfigService
  ) {
    this.config = AppConfigService.config;
  }
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
      text: '',
      captcha: ''
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
      recaptcha_response: this.form.captcha
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

  /**
   * Captcha resolve trigger
   * @param event Event
   */
  resolved(event) {
    this.form.captcha = event;
    this.captchaResolved = true;
  }

  /**
   * Is button disabled
   *
   * @param f Form
   * @returns True if captcha and form is resolved and valid False otherwise.
   */
  isDisabled(f) {
    return !(this.captchaResolved && f.valid);
  }
}
