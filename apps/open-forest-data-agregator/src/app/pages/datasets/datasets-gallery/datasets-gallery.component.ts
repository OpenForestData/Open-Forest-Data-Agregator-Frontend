import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-gallery',
  templateUrl: './datasets-gallery.component.html',
  styleUrls: ['./datasets-gallery.component.scss']
})
export class DatasetsGalleryComponent implements OnInit {
  @Input() datasets: any[];

  constructor() {}

  ngOnInit(): void {}
}
