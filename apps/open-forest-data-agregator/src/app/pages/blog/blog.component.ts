import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  public randomWords = [];

  public languageSubscription: Subscription = new Subscription();

  constructor(public languageService: LanguageService) {}

  ngOnInit() {
    for (let i = 0; i < 25; i++) this.randomWords.push(this.random());
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  getData() {}

  random() {
    const words = [
      ...'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident.'.split(' '),
      ...'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, provident.'.split('e')
    ];

    return words[Math.floor(Math.random() * words.length - 1)];
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
