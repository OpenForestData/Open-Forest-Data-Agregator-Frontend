import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-new-data-mobile',
  templateUrl: './new-data-mobile.component.html',
  styleUrls: ['../new-data/new-data.component.scss', './new-data-mobile.component.scss']
})
export class NewDataMobileComponent implements OnInit {
  public mobileActiveData = 0;

  constructor() {}

  ngOnInit() {}

  swipeLeftNews() {
    this.mobileActiveData += 1;
    this.mobileActiveData = this.mobileActiveData > 2 ? 0 : this.mobileActiveData;
  }

  swipeRightNews() {
    this.mobileActiveData -= 1;
    this.mobileActiveData = this.mobileActiveData < 0 ? 0 : this.mobileActiveData;
  }
}
