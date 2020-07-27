import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';

export interface IContactForm {
  name: string;
  last_name: string;
  e_mail: string;
  content: string;
  recaptcha_response: string;
}

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  sendContactForm(form: IContactForm) {
    return this.http.post(`${AppConfigService.config.api}contact`, form);
  }
}
