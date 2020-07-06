import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LanguageService } from './language.service';
import { Subject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Interface for navigation items
 *
 * @interface NavigationItem
 */
export interface NavigationItem {
  name: string;
  path: string;
  key: string;
  url?: string;
  children?: NavigationItem[];
}

/**
 * Utility service with usefull data and functions
 *
 * @export
 * @class UtilsService
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  /**
   * Sends information about menu beeing ready
   *
   * @type {Subject<any>}
   * @memberof UtilsService
   */
  public menuReadySubject: Subject<any> = new Subject();

  /**
   * Holds data from API
   *
   * @memberof UtilsService
   */
  public homePageData;

  /**
   * Defines whatever menu strucutre has been created
   *
   * @memberof UtilsService
   */
  public structureCreated = false;

  /**
   * Menu basic structure
   *
   * @private
   * @memberof UtilsService
   */
  private basicStructure: NavigationItem[] = [
    {
      name: 'nav.items.start',
      path: '/',
      key: 'start'
    },
    {
      name: 'nav.items.datasets',
      path: '/datasets',
      key: 'datasets'
    },
    {
      name: 'nav.items.stats',
      path: '/statistics',
      key: 'stats'
    },
    {
      name: 'nav.items.mobile-application',
      path: '/mobile-application',
      key: 'mobile-application'
    }
  ];

  /**
   * Menu Structure
   *
   * @private
   * @memberof UtilsService
   */
  private _menuStructure: NavigationItem[] = [
    {
      name: 'nav.items.start',
      path: '/',
      key: 'start'
    },
    {
      name: 'nav.items.datasets',
      path: '/datasets',
      key: 'datasets'
    },
    {
      name: 'nav.items.stats',
      path: '/statistics',
      key: 'stats'
    },
    {
      name: 'nav.items.mobile-application',
      path: '/mobile-application',
      key: 'mobile-application'
    }
  ];

  /**
   * Menu structure returned by API
   *
   * @type {*}
   * @memberof UtilsService
   */
  public responseData: any;

  /**
   * Getter of menu structure
   *
   * @type {NavigationItem[]}
   * @memberof UtilsService
   */
  public get menuStructure(): NavigationItem[] {
    return this._menuStructure;
  }

  /**
   * Setter for menu structure
   *
   * @memberof UtilsService
   */
  public set menuStructure(newValue: NavigationItem[]) {
    this._menuStructure = newValue;
  }

  /**
   * Returns menu object by slug name
   *
   * @param {*} slug
   * @returns
   * @memberof UtilsService
   */
  public getMenuBySlug(slug) {
    const currentLang = this.lang.language;
    const menu = this.responseData['menu'][currentLang];
    if (menu) {
      return menu.find(item => item.slug === slug);
    }

    return null;
  }

  /**
   * Creates an instance of UtilsService.
   * @param {HttpClient} http
   * @param {LanguageService} lang
   * @memberof UtilsService
   */
  constructor(
    public http: HttpClient,
    public lang: LanguageService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  /**
   * Sets seo tags
   *
   * @param {*} object
   * @param {string} [keyname=['title_seo', 'description', 'keywords_seo']]
   * @memberof UtilsService
   */
  public setSEO(object, keyname = ['title_seo', 'description', 'keywords_seo', 'og_image', 'og_type', 'author']) {
    if (object[keyname[0]] !== undefined) {
      this.titleService.setTitle(object[keyname[0]]);
    }

    if (object[keyname[1]] !== undefined) {
      this.metaService.addTags([
        { name: 'description', content: object[keyname[1]] },
        { name: 'keywords', content: object[keyname[2]] },
        { name: 'robots', content: 'index, follow' }
      ]);
    }

    if (object[keyname[3]] !== undefined) {
      this.metaService.addTag({ property: 'og:image', content: object[keyname[3]] });
    }

    if (object[keyname[4]] !== undefined) {
      this.metaService.addTag({ property: 'og:type', content: object[keyname[4]] });
    }

    if (object[keyname[5]] !== undefined) {
      this.metaService.addTag({ property: 'author', content: object[keyname[5]] });
    }
  }

  /**
   * Gets from API page data
   *
   * @param {*} slug
   * @returns
   * @memberof UtilsService
   */
  public getPageContent(slug) {
    const menu = this.getMenuBySlug(slug);
    return this.http.get(`${AppConfigService.config.api}${menu.url}`);
  }

  /**
   * Gets menu structure from API
   *
   * @returns
   * @memberof UtilsService
   */
  public getStructure() {
    return new Promise((res, rej) => {
      this.http.get(`${AppConfigService.config.api}structure`).subscribe(response => {
        this.responseData = response;
        this.buildStructure();
        this.menuReadySubject.next();
        this.structureCreated = true;
        return res();
      });
    });
  }

  /**
   * Creates structure for navigation from API data
   *
   * @memberof UtilsService
   */
  buildStructure() {
    const currentLang = this.lang.language;
    const menu = this.responseData['menu'][currentLang];
    if (menu) {
      this.menuStructure = [
        ...this.basicStructure,
        ...menu
          .filter(item => item.parent_id === null)
          .map(item => {
            return (item = {
              name: item.title,
              path: `/more/${item.slug}`,
              url: item.url,
              key: '',
              children: menu
                .filter(child => child.parent_id === item.id)
                .map(childItem => {
                  return {
                    name: childItem.title,
                    path: `/more/${childItem.slug}`,
                    url: childItem.url,
                    key: ''
                  };
                })
            });
          }),
        {
          name: '',
          path: '/blog',
          key: 'blog'
        }
      ];
    }
  }

  /**
   * Gets home page from API
   *
   * @returns
   * @memberof UtilsService
   */
  getHomePage() {
    return this.http.get(`${AppConfigService.config.api}home`);
  }
}
