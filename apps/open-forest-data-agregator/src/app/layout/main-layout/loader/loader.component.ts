import { Component } from '@angular/core';
import { LoaderService } from '@app/services/loader.service';

/**
 * Loader component
 */
@Component({
  selector: 'ofd-agregator-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  /**
   * Loader component constructor
   * @param loaderService Loader service
   */
  constructor(public loaderService: LoaderService) {}
}
