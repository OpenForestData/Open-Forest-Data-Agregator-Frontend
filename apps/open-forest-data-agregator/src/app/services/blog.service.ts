import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

/**
 * Blog service
 */
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) {}

  /**
   * Get blog data
   * @example
   * getBlog()
   * // returns blog data object
   */
  getBlog(filters) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}blog?${queryParams}`);
  }

  /**
   * Get blog slug data
   * @example
   * getBlogSlug()
   * // returns blog slug data object
   */
  getBlogSlug(slug: any) {
    return this.http.get<any>(`${AppConfigService.config.cms}blog/article/${slug}`);
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
