import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  links: object = {
    fbLink: 'https://whiteaster.com/',
    instaLink: 'https://whiteaster.com/',
    twitterLink: 'https://whiteaster.com/',
    emailLink: 'https://whiteaster.com/'
  };
  constructor() {}

  ngOnInit() {}
}
