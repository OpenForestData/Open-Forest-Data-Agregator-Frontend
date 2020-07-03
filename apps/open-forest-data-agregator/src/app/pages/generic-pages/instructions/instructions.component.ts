import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
/**
 * Instructions page view
 *
 * @export
 * @class InstructionsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit, OnDestroy {
  /**
   * Accordion content
   *
   * @memberof InstructionsComponent
   */
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

  /**
   * Language change subscription
   *
   * @type {Subscription}
   * @memberof HomeNewsComponent
   */
  public languageSubscription: Subscription = new Subscription();
  /**
   *
   * @param {LanguageService} languageService
   * @memberof HomeNewsComponent
   */
  constructor(public languageService: LanguageService) {}

  /**
   * @ignore
   *
   * @memberof HomeNewsComponent
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());
  }

  /**
   * Fetch data from API
   *
   * @memberof HomeNewsComponent
   */
  getData() {}

  /**
   * @ignore
   *
   * @memberof HomeNewsComponent
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
