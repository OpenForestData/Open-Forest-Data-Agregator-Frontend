import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {
  @Input() resource;
  constructor() {}

  ngOnInit() {}
}
