import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';

/**
 * Faq service
 */
@Injectable({
  providedIn: 'root'
})
export class FAQService {
  /**
   * Faq service constructor
   * @param {HttpClient} http Http Client
   */
  constructor(private http: HttpClient) {}

  /**
   * Get faqs from API
   */
  getFAQs() {
    return this.http.get(`${AppConfigService.config.api}faq`);
  }
}
