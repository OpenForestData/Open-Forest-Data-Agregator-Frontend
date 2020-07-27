import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class FAQService {
  constructor(private http: HttpClient) {}

  getFAQs() {
    return this.http.get(`${AppConfigService.config.api}faq`);
  }
}
