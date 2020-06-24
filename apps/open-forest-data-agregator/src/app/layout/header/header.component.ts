import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'ng2-date-picker/common/services/utils/utils.service';
import { DatasetsService } from '@app/pages/datasets/datasets.service';

/**
 * Header Component
 */
@Component({
  selector: 'ofd-header',
  styleUrls: ['header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public showMobileMenu = false;

  /**
   * @ignore
   */
  constructor(public DSService: DatasetsService) {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
