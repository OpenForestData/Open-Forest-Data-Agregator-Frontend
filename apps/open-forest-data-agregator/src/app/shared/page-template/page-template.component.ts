import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent implements OnInit {
  @Input() iconURL = '';
  @Input() pageTitle = '';
  @Input() pageContent = ``;

  constructor() {}

  ngOnInit() {}
}
