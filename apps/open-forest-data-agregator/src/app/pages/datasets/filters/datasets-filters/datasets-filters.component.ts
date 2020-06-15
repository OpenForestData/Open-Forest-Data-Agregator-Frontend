import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { categoriesMock } from '@app/pages/datasets/datasets.mock';
import { DatasetsService } from '../../datasets.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ofd-agregator-datasets-filters',
  templateUrl: './datasets-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./datasets-filters.component.scss']
})
export class DatasetsFiltersComponent implements OnInit, OnDestroy {
  public moreCountStart = 5;
  public subs: Subscription = new Subscription();
  public checkbox = {
    media: {
      key: 'media',
      value: false
    },
    coordinates: {
      key: 'coordinates',
      value: false
    }
  };
  public filters = {};
  public categories: any = {
    data: () => {}
  };

  public queryParams = {};
  public keys = Object.keys;
  public moreFilters = false;
  public isMobile = false;

  public showAdvanced = true;
  public selectedPeople = [];
  public people = [
    {
      id: '5a15b13c36e7a7f00cf0d7cb',
      name: 'Karyn Wright'
    },
    {
      id: '5a15b13c2340978ec3d2c0ea',
      name: 'Rochelle Estes'
    },
    {
      id: '5a15b13c663ea0af9ad0dae8',
      name: 'Mendoza Ruiz'
    },
    {
      id: '5a15b13cc9eeb36511d65acf',
      name: 'Rosales Russell'
    },
    {
      id: '5a15b13c728cd3f43cc0fe8a',
      name: 'Marquez Nolan'
    },
    {
      id: '5a15b13ca51b0aaf8a99c05a',
      name: 'Franklin James'
    },
    {
      id: '5a15b13cc3b9381ffcb1d6f7',
      name: 'Elsa Bradley'
    },
    {
      id: '5a15b13ce58cb6ff62c65164',
      name: 'Pearson Thompson'
    },
    {
      id: '5a15b13c90b95eb68010c86e',
      name: 'Ina Pugh'
    },
    {
      id: '5a15b13c2b1746e12788711f',
      name: 'Nguyen Elliott'
    },
    {
      id: '5a15b13c605403381eec5019',
      name: 'Mills Barnett'
    },
    {
      id: '5a15b13c67e2e6d1a3cd6ca5',
      name: 'Margaret Reynolds'
    },
    {
      id: '5a15b13c947c836d177aa85c',
      name: 'Yvette Navarro'
    },
    {
      id: '5a15b13c5dbbe61245c1fb73',
      name: 'Elisa Guzman'
    },
    {
      id: '5a15b13c38fd49fefea8db80',
      name: 'Jodie Bowman'
    },
    {
      id: '5a15b13c9680913c470eb8fd',
      name: 'Diann Booker'
    }
  ];

  public get selectedCategory() {
    return this.DSService.searchFilters.data.category;
  }

  // tslint:disable-next-line
  @Output() onDisplayModeChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkMobile();
  }

  constructor(public DSService: DatasetsService, public cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.subs.add(
      this.DSService.dataChangedSubject.subscribe(() => {
        this.cd.detectChanges();
      })
    );

    this.route.queryParams.subscribe(params => {
      const exclude = ['start', 'rows', 'category'];
      const p = {};
      // tslint:disable-next-line: forin
      for (const index in params) {
        // tslint:disable-next-line: prefer-conditional-expression
        if (exclude.includes(index)) {
          p[index] = params[index];
        } else {
          p[index] = !Array.isArray(params[index]) ? [params[index]] : params[index];
        }
      }
      this.queryParams = p;
    });

    if (this.queryParams['category']) this.categoryChanged(this.queryParams['category']);
    if (this.queryParams['start']) this.DSService.searchFilters = { field: 'start', data: this.queryParams['start'] };
    if (this.queryParams['rows']) this.DSService.searchFilters = { field: 'rows', data: this.queryParams['rows'] };

    this.getFilters();
    this.getFilters(false);
  }

  ngOnInit(): void {
    this.checkMobile();
    setTimeout(() => {
      this.filtersChanged(null);
    }, 0);
  }

  public getFilters(beginning = true) {
    const filter = this.DSService.searchData.list.available_filter_fields;

    Object.keys(filter).forEach(key => {
      const obj = {
        isExpanded: this.filters[key] ? this.filters[key].isExpanded : this.queryParams[key] ? true : false,
        key,
        value: this.filters[key] ? this.filters[key].value : this.queryParams[key] ? this.queryParams[key] : [],
        name: filter[key].friendly_name,
        multiple: true,
        data: () => {
          return filter[key].attributes
            ? filter[key].attributes.map(item => Object.create({ name: item.name, value: item.name }))
            : [];
        }
      };

      if (key === 'category') {
        obj.multiple = false;
        obj.data = () => {
          return filter[key].map(item => Object.create({ name: item.friendly_name, value: item.id }));
        };
        this.categories = obj;
      } else {
        this.filters[key] = obj;
      }
    });

    return beginning
      ? Object.keys(this.filters).slice(0, this.moreCountStart)
      : Object.keys(this.filters).slice(this.moreCountStart);
  }

  categoryChanged(value) {
    this.DSService.searchFilters = { field: 'category', data: value };
  }

  filtersChanged(payload) {
    this.DSService.searchFilters = { field: 'basic', data: this.filters };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  checkMobile() {
    if (this.isMobile !== window.innerWidth <= 1200) {
      this.isMobile = window.innerWidth <= 1200;
      this.moreFilters = this.isMobile;

      this.onDisplayModeChange.emit(this.isMobile ? 'mobile' : 'desktop');
    }
  }
}
