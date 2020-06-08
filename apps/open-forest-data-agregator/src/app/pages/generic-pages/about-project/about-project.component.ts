import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';

@Component({
  selector: 'ofd-agregator-about-project',
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.scss']
})
export class AboutProjectComponent implements OnInit, OnDestroy {
  public iconURL = 'assets/modules/generic/about_project.png';
  public pageTitle = 'misc.about_project';
  public pageContent = `
  <p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus vero ratione quasi iure harum deserunt earum
  architecto, quos voluptas ipsum iusto nostrum, nisi autem dicta id necessitatibus possimus, voluptatem nobis!
</p>

<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptatibus quos alias totam dolorum, cupiditate est
  nam magnam impedit ipsum!
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptatibus quos alias totam dolorum, cupiditate est
  nam magnam impedit ipsum!
</p>
<br>
<h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>

<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptatibus architecto sapiente tempore laborum,
  molestias dolorum eum obcaecati animi at cupiditate, ut quod est, culpa velit provident dignissimos fugiat! Quos
  voluptas voluptatum suscipit accusantium numquam porro inventore possimus, nam laboriosam enim ratione dolores
  repellendus tempore voluptates temporibus magnam sequi! Dicta, fugiat. Architecto dolore est assumenda possimus,
  veniam corrupti odio

<p>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta repudiandae quasi maiores repellendus illo incidunt
  asperiores nemo aut fugiat magnam.
  error consectetur eveniet repellendus perferendis ea fuga voluptate nihil! Vitae necessitatibus
  dignissimos iusto facere architecto in esse rem voluptate amet sint ullam debitis deleniti dolorem, saepe, sapiente a,
  quidem quod mollitia.
</p>
<br>
<h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>

<p>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta repudiandae quasi maiores repellendus illo incidunt
  asperiores nemo aut fugiat magnam.
  error consectetur eveniet repellendus perferendis ea fuga voluptate nihil! Vitae necessitatibus
  dignissimos iusto facere architecto in esse rem voluptate amet sint ullam debitis deleniti dolorem, saepe, sapiente a,
  quidem quod mollitia.
</p>

  `;

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
