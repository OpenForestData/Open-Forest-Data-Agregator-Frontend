import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { map } from 'rxjs/operators';

/**
 * Blog service
 */
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  /**
   * Blog service constructor
   * @param {HttpClient} http Http Client
   */
  constructor(private http: HttpClient) {}

  /**
   * Get blog data
   * @param {any} filters Filters
   * @example
   * getBlog()
   * // returns blog data object
   */
  getBlog(filters) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}blog?${queryParams}`).pipe(
      map(response => {
        response['articles'].map(article => {
          article['image_in_list'] =
            article['image_in_list'] !== ''
              ? AppConfigService.config.api + article['image_in_list'].replace('/api/v1/', '')
              : '/assets/images/no_photo.png';
        });
        return response;
      })
    );
  }

  /**
   * Get blog slug data
   * @param {any} slug Article slug
   * @example
   * getBlogSlug()
   * // returns blog slug data object
   */
  getBlogSlug(slug: any) {
    return this.http.get<any>(`${AppConfigService.config.api}pages?slug=/cms-api/v1/blog/article/${slug}`).pipe(
      map(response => {
        if (response['article'] && response['article']['image_in_list']) {
          response['article']['image_in_list'] =
            response['article']['image_in_list'] !== ''
              ? AppConfigService.config.api + response['article']['image_in_list'].replace('/api/v1/', '')
              : '';
        }
        return response;
      })
    );
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

  /**
   * Get article for blog by slug
   * @param {string} slug Slug
   */
  getArticlesByKeyword(slug: string) {
    return this.http.get<any>(`${AppConfigService.config.api}pages?slug=${slug}`);
  }
}
