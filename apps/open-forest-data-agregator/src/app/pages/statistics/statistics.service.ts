import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@app/services/app-config.service';
import { Observable } from 'rxjs';
import { UtilsService } from '@app/services/utils.service';

/**
 * Statistics service
 */
@Injectable()
export class StatisticsService {
  /**
   * Statistics service constructor
   * @param http Http Client
   * @param utils Utils service
   */
  constructor(public http: HttpClient, public utils: UtilsService) {}

  /**
   * Get statistics
   *
   * @returns {Observable<any>}
   */
  getStatistics(params: any = {}): Observable<any> {
    const queryParams = this.utils.getQueryParamsFromObject(params);
    return this.http.get(`${AppConfigService.config.api}metrics-total?${queryParams}`);
  }
}
