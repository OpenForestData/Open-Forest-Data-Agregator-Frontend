import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() resource;

  constructor() {}

  ngOnInit() {}
}
