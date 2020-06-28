import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetsService } from '../datasets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ofd-agregator-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.scss']
})
export class DatasetsListComponent implements OnInit, OnDestroy {
  public sortItems = [
    { name: 'A-Z', value: 1 },
    { name: 'Z-A', value: 0 }
  ];

  public sortBy = this.sortItems[0];
  public sub: Subscription;

  public options: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };

  @Input() datasets: any[];

  public doi = 'doi:10.5072/FK2/MDWWUY';

  sortChanged(sortValue) {
    this.DSService.searchFilters = { field: 'sort', data: sortValue.value ? 'asc' : 'desc', search: true };
  }

  convertDOI(doi) {
    const convertedDOI = btoa(doi);
    return convertedDOI;
  }

  constructor(public DSService: DatasetsService) {
    this.sub = this.DSService.sortSubject.subscribe(_ => {
      this.sortBy = this.DSService.searchFilters.data['sort'] === 'asc' ? this.sortItems[0] : this.sortItems[1];
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
