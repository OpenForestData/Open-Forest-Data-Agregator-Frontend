import { Component } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
/**
 * Mobile App section view at home page
 */
@Component({
  selector: 'ofd-agregator-home-mobile-app',
  templateUrl: './home-mobile-app.component.html',
  styleUrls: ['./home-mobile-app.component.scss', '../home.media.scss']
})
export class HomeMobileAppComponent {
  /**
   * Home mobile app component constructor
   * @param {UtilsService} utilService Utils service
   */
  constructor(public utilService: UtilsService) {}
}
