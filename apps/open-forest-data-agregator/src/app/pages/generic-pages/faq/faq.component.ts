import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
/**
 * Faq page view
 *
 * @export
 * @class FaqComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {
  /**
   * Accordion content
   *
   * @memberof FaqComponent
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
