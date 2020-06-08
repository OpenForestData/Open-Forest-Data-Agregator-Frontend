import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit, OnDestroy {
  public accordionContent = [
    {
      title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.`
    },
    {
      title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.`
    },
    {
      title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.`
    },
    {
      title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.`
    },
    {
      title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Cumque officiis, illo nulla, amet sed explicabo ex laboriosam asperiores reprehenderit,
      suscipit perferendis rem veritatis non aliquid incidunt ullam ut nobis tenetur.`
    }
  ];

  public languageSubscription: Subscription = new Subscription();
  constructor(public languageService: LanguageService) {}
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }
  getData() {}
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
