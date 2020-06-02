import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() resource;
  constructor() {}

  ngOnInit() {}
}
