import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss', '../home.media.scss']
})
export class HomeBannerComponent implements OnInit {
  public showMobileCategories = false;

  constructor() {}

  ngOnInit() {}
}
