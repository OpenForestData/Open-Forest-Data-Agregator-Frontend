import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '@app/services/language.service';
import { FAQService } from '@app/pages/generic-pages/faq/faq.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AccordionComponent } from '@app/shared/accordion/accordion.component';

/**
 * Faq page view
 */
@Component({
  selector: 'ofd-agregator-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {
  /**
   * Accordion content
   */
  public accordionContent = [];

  /**
   * Accordion component reference
   */
  @ViewChild('accordionComponent') public accordionComponent: AccordionComponent;

  /**
   * Language change subscription
   */
  public languageSubscription: Subscription = new Subscription();

  /**
   * FAQ Component constructor
   * @param {LanguageService} languageService Language service
   * @param {FAQService} faqService Faq Service
   * @param {ActivatedRoute} route Activated route
   */
  constructor(public languageService: LanguageService, public faqService: FAQService, private route: ActivatedRoute) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.languageSubscription = this.languageService.changeLanguage.subscribe(() => this.getData());

    this.faqService.getFAQs().subscribe((faqs: any[]) => {
      this.accordionContent = faqs.map(faq => {
        return { ...faq, html_id: 'faq-' + faq.anchor };
      });

      this.route.fragment.pipe(take(1)).subscribe((fragment: string) => {
        let selectedFaq = null;
        this.accordionContent.forEach((item, index: number) => {
          if (item.html_id === fragment) {
            selectedFaq = { index, item };
          }
        });
        if (selectedFaq) {
          this.accordionComponent.activeAccordion = selectedFaq.index;
          setTimeout(() => {
            const element = document.querySelector(`#${fragment}`);
            if (element) {
              element.scrollIntoView();
            }
          }, 300);
        }
      });
    });
  }

  /**
   * Fetch data from API
   */
  getData() {}

  /**
   * @ignore
   */
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
