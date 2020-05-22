import { Component, OnInit } from '@angular/core';
import { UIModalService } from '@app/shared/ui-modal/ui-modal.service';

@Component({
  selector: 'ofd-agregator-home-faq-contact',
  templateUrl: './home-faq-contact.component.html',
  styleUrls: ['./home-faq-contact.component.scss', '../home.media.scss']
})
export class HomeFaqContactComponent implements OnInit {
  constructor(public modal: UIModalService) {}

  ngOnInit() {}
}
