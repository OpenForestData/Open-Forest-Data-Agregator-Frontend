import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { LanguageService } from '@app/services/language.service';
import { Subscription } from 'rxjs';

/**
 * Home Component
 */
@Component({
  selector: 'ofd-home',
  templateUrl: './home.component.html',
  styles: [
    `
      ofd-home-slider {
        position: relative;
        display: block;
      }
    `
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public languageSubscription: Subscription = new Subscription();
  constructor(public languageService: LanguageService, public modal: UIModalService) {}
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }
  getData() {}
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  onModalClose() {
    this.modal.close('contact-modal');
  }
}
