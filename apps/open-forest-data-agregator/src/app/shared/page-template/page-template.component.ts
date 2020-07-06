import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { UtilsService } from '@app/services/utils.service';
import { LanguageService } from '@app/services/language.service';
/**
 * Template for generic page
 *
 * @export
 * @class PageTemplateComponent
 */
@Component({
  selector: 'ofd-agregator-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent implements OnInit, OnDestroy {
  /**
   * Accordion data
   *
   * @memberof PageTemplateComponent
   */
  public accordionData = [];
  /**
   * If accordion is present
   *
   * @memberof PageTemplateComponent
   */
  public ifAccordion = false;

  /**
   * If latest date module is present
   *
   * @memberof PageTemplateComponent
   */
  public ifNewData = false;

  /**
   * Icon URL for title component
   *
   * @memberof PageTemplateComponent
   */
  @Input() iconURL = '';
  /**
   * Title of news for title component
   *
   * @memberof PageTemplateComponent
   */
  @Input() pageTitle = '';

  /**
   * Page content
   *
   * @memberof PageTemplateComponent
   */
  @Input() pageContent = ``;

  /**
   * @ignore
   *
   * @type {Subscription}
   * @memberof PageTemplateComponent
   */
  public routerSubscription: Subscription = new Subscription();

  /**
   * Slug
   *
   * @memberof PageTemplateComponent
   */
  public slug;

  /**
   * Creates an instance of PageTemplateComponent.
   * @param {ActivatedRoute} route
   * @param {UtilsService} utils
   * @memberof PageTemplateComponent
   */
  constructor(public route: ActivatedRoute, public utils: UtilsService, public lang: LanguageService) {}

  /**
   * @ignore
   *
   * @memberof PageTemplateComponent
   */
  ngOnInit() {
    this.routerSubscription.add(
      this.route.params.subscribe(params => {
        this.slug = params['slug'];
      })
    );

    this.routerSubscription.add(
      this.utils.menuReadySubject.subscribe(_ => {
        this.utils.getPageContent(this.slug).subscribe((pageContent: any) => this.readPageData(pageContent));
      })
    );

    this.routerSubscription.add(
      this.lang.changeLanguage.subscribe(_ => {
        this.utils.getPageContent(this.slug).subscribe((pageContent: any) => this.readPageData(pageContent));
      })
    );

    if (this.utils.structureCreated) {
      this.utils.getPageContent(this.slug).subscribe((pageContent: any) => this.readPageData(pageContent));
    }
  }

  /**
   * Sets data to component from API
   *
   * @param {*} pageContent
   * @memberof PageTemplateComponent
   */
  readPageData(pageContent) {
    if (pageContent.accordions) {
      this.ifAccordion = true;
      this.accordionData = pageContent.accordions;
    }

    this.pageTitle = pageContent.title;
    this.pageContent = pageContent.content;

    this.utils.setSEO(pageContent);
  }

  /**
   * @ignore
   *
   * @memberof PageTemplateComponent
   */
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
