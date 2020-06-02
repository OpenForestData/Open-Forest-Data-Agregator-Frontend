import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  @Input() resource;
  constructor() {}

  ngOnInit() {}
}
