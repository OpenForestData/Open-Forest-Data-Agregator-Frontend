import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';
import { Observable } from 'rxjs';

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

  /**
   * Get statistics
   *
   * @returns {Observable<any>}
   */
  getStatistics(): Observable<any> {
    return this.http.get(`${AppConfigService.config.api}metrics-total`);
  }
}
