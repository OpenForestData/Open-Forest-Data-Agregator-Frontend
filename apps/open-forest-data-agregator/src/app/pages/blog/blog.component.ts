import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public randomWords = [];

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 25; i++) this.randomWords.push(this.random());
  }

  random() {
    const words = [
      ...'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident.'.split(' '),
      ...'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident.'.split('e')
    ];

    return words[Math.floor(Math.random() * words.length - 1)];
  }
}
