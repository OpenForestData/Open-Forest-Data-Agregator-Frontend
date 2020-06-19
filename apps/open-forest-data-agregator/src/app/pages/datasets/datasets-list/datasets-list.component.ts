import { Component, Input, OnInit } from '@angular/core';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';
import { DatasetsService } from '../datasets.service';

@Component({
  selector: 'ofd-agregator-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.scss']
})
export class DatasetsListComponent implements OnInit {
  public sortItems = [
    { name: 'A-Z', value: 0 },
    { name: 'Z-A', value: 0 }
  ];

  public sortBy = null;

  public options: IUISelectOptions = {
    placeholder: 'Sortuj wg'
  };

  @Input() datasets: any[];

  public doi = 'doi:10.5072/FK2/MDWWUY';

  convertDOI(doi) {
    const convertedDOI = btoa(doi);
    return convertedDOI;
  }

  constructor(public DSService: DatasetsService) {}

  ngOnInit(): void {}
}
