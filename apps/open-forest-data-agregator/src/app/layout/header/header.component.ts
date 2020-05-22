import { Component, OnInit } from '@angular/core';

/**
 * Header Component
 */
@Component({
  selector: 'ofd-header',
  styleUrls: ['header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public showMobileMenu = false;

  /**
   * @ignore
   */
  constructor() {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
