import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatasetsService } from '../datasets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ofd-agregator-datasets-header',
  templateUrl: './datasets-header.component.html',
  styleUrls: ['./datasets-header.component.scss']
})
export class DatasetsHeaderComponent implements OnInit, OnDestroy {
  public searchValue = '';
  public sub: Subscription;

  constructor(public DSService: DatasetsService) {
    this.sub = this.DSService.updateQuerySubject.subscribe(query => {
      this.searchValue = query;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.searchValue = this.DSService.searchFilters.data['q'];
    }, 300);
  }

  search() {
    this.DSService.searchFilters = { field: 'q', data: this.searchValue };
    this.DSService.updateQuerySubject.next(this.searchValue);
  }

  showAdvanced() {
    this.DSService.showAdvancedSubject.next();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
