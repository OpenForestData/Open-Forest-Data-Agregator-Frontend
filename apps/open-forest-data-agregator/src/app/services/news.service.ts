import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { map } from 'rxjs/operators';

/**
 * News service
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  /**
   * News service constructor
   * @param {HttpClient} http Http client
   */
  constructor(private http: HttpClient) {}

  /**
   * Get blog data
   * @example
   * getBlog()
   * // returns blog data object
   */
  getNews(filters) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}news?${queryParams}`).pipe(
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
   * Get news data from url
   * @param {string} url News Url
   */
  getSingleNews(url: string) {
    return this.http.get<any>(`${AppConfigService.config.api}news-slug?slug=/cms-api/v1/news/${url}`).pipe(
      map(response => {
        if (response['article']) {
          response['article']['image_in_list'] =
            response['article']['image_in_list'] !== ''
              ? AppConfigService.config.api + response['article']['image_in_list'].replace('/api/v1/', '')
              : '/assets/images/no_photo.png';
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
}
