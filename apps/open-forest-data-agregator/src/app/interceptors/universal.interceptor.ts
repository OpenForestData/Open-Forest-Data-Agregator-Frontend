import { Inject, Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Request } from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Observable } from 'rxjs';

/**
 * Check if url starts with something
 * @param {Array} arr Array of checked values
 */
const startsWithAny = (arr: string[] = []) => (value = '') => {
  return arr.some(test => value.toLowerCase().startsWith(test.toLowerCase()));
};

/**
 * Check if url is absolute
 */
const isAbsoluteURL = startsWithAny(['http', '//']);

/**
 * Interceptor for Angular universal
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  /**
   * @ignore
   */
  constructor(@Optional() @Inject(REQUEST) protected request: Request) {
  }

  /**
   * Change relative request URL to absolute
   * @param {HttpRequest} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>} Request
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.request && !isAbsoluteURL(req.url)) {
      const protocolHost = `${this.request.protocol}://${this.request.get('host')}`;
      const pathSeparator = !req.url.startsWith('/') ? '/' : '';
      const url = protocolHost + pathSeparator + req.url;
      const serverRequest = req.clone({ url });
      return next.handle(serverRequest);
    } else {
      return next.handle(req);
    }
  }
}
