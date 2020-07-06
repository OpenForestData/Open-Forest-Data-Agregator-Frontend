import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['../blog.component.scss', './post-tile.component.scss']
})
export class PostTileComponent implements OnInit {
  @Input() article;
  constructor() {}

  ngOnInit() {}
}
