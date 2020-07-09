import { Component } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
/**
 * Mobile App section view at home page
 *
 * @export
 * @class HomeMobileAppComponent
 */
@Component({
  selector: 'ofd-agregator-home-mobile-app',
  templateUrl: './home-mobile-app.component.html',
  styleUrls: ['./home-mobile-app.component.scss', '../home.media.scss']
})
export class HomeMobileAppComponent {
  constructor(public utilService: UtilsService) {}
}
