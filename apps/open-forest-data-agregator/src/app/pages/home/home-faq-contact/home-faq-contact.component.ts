import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-home-faq-contact',
  templateUrl: './home-faq-contact.component.html',
  styleUrls: ['./home-faq-contact.component.scss', '../home.media.scss']
})
export class HomeFaqContactComponent implements OnInit, OnDestroy {
  public languageSubscription: Subscription = new Subscription();
  constructor(public languageService: LanguageService, public modal: UIModalService) {}
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }
  getData() {}
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
