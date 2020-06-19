import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Application config service
 */
@Injectable()
export class AppConfigService {
  /**
   * Application config
   */
  public static config;

  /**
   * @ignore
   */
  constructor(private http: HttpClient) {}

  /**
   * Load config from file 'config.json'
   */
  load() {
    const jsonFile = `config.json`;

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then(response => {
          AppConfigService.config = response;
          resolve();
        })
        .catch((error: any) => {
          reject('No config provided!');
        });
    });
  }
}
