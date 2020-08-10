import { Component } from '@angular/core';
import { HomeNewsComponent } from '../home-news/home-news.component';
import { NewsService } from '@app/services/news.service';
import { LanguageService } from '@app/services/language.service';
import { DatasetsService } from '@app/pages/datasets/datasets.service';
/**
 * Mobile view of news at home page
 */
@Component({
  selector: 'ofd-agregator-home-news-mobile',
  templateUrl: './home-news-mobile.component.html',
  styleUrls: [
    '../home-news/home-news.component.scss',
    '../home-search/home-search.component.scss',
    './home-news-mobile.component.scss'
  ]
})
export class HomeNewsMobileComponent extends HomeNewsComponent {
  /**
   * Current slide
   *
   * @memberof HomeNewsMobileComponent
   */
  public mobileActiveNews = 0;

  /**
   * Dataset of the day
   */
  public datasetOfTheDay: {
    /**
     * Dataset name
     */
    name: string;
    /**
     * Dataset latin name
     */
    latinName: string;
    /**
     * Dataset preview URL.
     */
    preview: string;
    /**
     * Dataset DOI
     */
    identifier64: string;
  } = null;

  constructor(
    public DSService: DatasetsService,
    public newsService: NewsService,
    public languageService: LanguageService
  ) {
    super(languageService, newsService);

    this.DSService.getDatasetOfTheDay().subscribe(response => {
      try {
        this.datasetOfTheDay = {
          name: response['latestVersion']['metadataBlocks']['citation']['fields'].filter(
            field => field['typeName'] === 'title'
          )[0]['value'],
          preview:
            response['latestVersion']['files']
              .filter((_: any) => _.thumbnail_url)
              .map((_: any) => _.thumbnail_url)[0] || null,
          latinName: '',
          identifier64: btoa(response['latestVersion']['datasetPersistentId'])
        };
      } catch (e) {}
    });
  }

  /**
   * Next slide
   *
   * @memberof HomeNewsMobileComponent
   */
  swipeLeftNews() {
    this.mobileActiveNews += 1;
    this.mobileActiveNews = this.mobileActiveNews > 2 ? 0 : this.mobileActiveNews;
  }

  /**
   * Previous slide
   *
   * @memberof HomeNewsMobileComponent
   */
  swipeRightNews() {
    this.mobileActiveNews -= 1;
    this.mobileActiveNews = this.mobileActiveNews < 0 ? 0 : this.mobileActiveNews;
  }
}
