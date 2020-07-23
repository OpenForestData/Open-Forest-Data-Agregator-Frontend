import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  /**
   * Get blog data
   * @example
   * getBlog()
   * // returns blog data object
   */
  getNews(filters) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}news?${queryParams}`);
  }

  getSingleNews(url: any) {
    return this.http.get<any>(`${AppConfigService.config.api}news-slug?slug=/cms-api/v1/news/news/${url}`);
  }

  /**
   * Parse object to query param string
   * @param {any} object Object
   * @returns {string} Query params
   */
  getQueryParamsFromObject(object: any) {
    return Object.keys(object)
      .filter(key => {
        return object[key] instanceof Array ? object[key].length > 0 : object[key] !== '' && object[key] !== null;
      })
      .map(key => {
        if (object[key] instanceof Array) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(object[key].join(','));
        } else {
          return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
        }
      })
      .join('&');
  }
}
