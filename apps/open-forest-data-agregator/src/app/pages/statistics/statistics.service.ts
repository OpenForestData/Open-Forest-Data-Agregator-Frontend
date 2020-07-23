import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';

/**
 * Statistics service
 */
@Injectable()
export class StatisticsService {
  /**
   * Statistics service constructor
   * @param http Http Client
   */
  constructor(public http: HttpClient) {}

  getStatistics() {
    return this.http.get(`${AppConfigService.config.api}metrics-total`);
  }
}
