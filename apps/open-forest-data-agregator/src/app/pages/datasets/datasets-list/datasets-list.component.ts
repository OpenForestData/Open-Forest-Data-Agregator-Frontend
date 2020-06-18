import { Component, Input, OnInit } from '@angular/core';
import { IUISelectOptions } from '@libs/ui-select/src/lib/ui-select/ui-select.component';

@Component({
  selector: 'ofd-agregator-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.scss']
})
export class DatasetsListComponent implements OnInit {
  /*
   * MOCK
   */
  public page = 1;

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

  constructor() {}

  ngOnInit(): void {}
}
