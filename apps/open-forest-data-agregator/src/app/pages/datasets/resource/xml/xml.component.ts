import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent implements OnInit {
  @Input() resource;
  constructor() {}

  ngOnInit() {}
}
