import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';

/**
 * Contact form interface
 */
export interface IContactForm {
  /**
   * Name
   */
  name: string;
  /**
   * Last name
   */
  last_name: string;
  /**
   * Email
   */
  e_mail: string;
  /**
   * Mail content
   */
  content: string;
  /**
   * Recaptcha response from API
   */
  recaptcha_response: string;
}

/**
 * Home service
 */
@Injectable()
export class HomeService {
  /**
   * Home service constructor
   * @param {HttpClient} http Http Client
   */
  constructor(private http: HttpClient) {}

  /**
   * Send contact form
   * @param {IContactForm} form Form payload
   */
  sendContactForm(form: IContactForm) {
    return this.http.post(`${AppConfigService.config.api}contact`, form);
  }
}
