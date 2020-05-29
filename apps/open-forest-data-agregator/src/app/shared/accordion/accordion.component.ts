import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() accordionContent = [];
  public activeAccordion = -1;

  constructor() {}

  ngOnInit() {}
}
