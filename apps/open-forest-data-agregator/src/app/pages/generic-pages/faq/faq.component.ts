import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
