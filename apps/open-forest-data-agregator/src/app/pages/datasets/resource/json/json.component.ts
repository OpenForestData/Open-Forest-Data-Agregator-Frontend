import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {
  @Input() resource;
  constructor() {}

  ngOnInit() {}
}
