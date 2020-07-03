import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
/**
 * About project page view
 *
 * @export
 * @class AboutProjectComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ofd-agregator-about-project',
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.scss']
})
export class AboutProjectComponent implements OnInit, OnDestroy {
  /**
   * Page icon near title
   *
   * @memberof AboutProjectComponent
   */
  public iconURL = 'assets/modules/generic/about_project.png';
  /**
   * Page title for title component
   *
   * @memberof AboutProjectComponent
   */
  public pageTitle = 'misc.about_project';

  /**
   * Page content
   *
   * @memberof AboutProjectComponent
   */
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
