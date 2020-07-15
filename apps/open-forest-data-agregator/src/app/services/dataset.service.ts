import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

/**
 * Dataset service
 */
@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  /**
   * Dataset constructor
   * @param {HttpClient} http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Get dataset object by doi
   * @param {doi} doi identifier
   */
  getDatasetByDOI(doi: any) {
    return this.http.get<any>(`${AppConfigService.config.api}dataset?identifier=${doi}`);
  }

  /**
   * Get resource object by id
   * @param {number} id identification number
   */
  getResourceByID(id: number) {
    return this.http.get<any>(`${AppConfigService.config.api}resource/${id}`);
  }
}
