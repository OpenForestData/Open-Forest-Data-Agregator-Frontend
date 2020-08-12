import { Injectable } from '@angular/core';

/**
 * Loader service
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  /**
   * Show loader
   */
  isLoading = false;
}
