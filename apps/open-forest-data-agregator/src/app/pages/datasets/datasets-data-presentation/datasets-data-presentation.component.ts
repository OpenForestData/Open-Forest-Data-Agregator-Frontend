import { Component, ElementRef, ViewChild, Host } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '@app/store';
import { DatasetsChangeViewMode } from '@app/store/datasets/datasets.actions';
import { DatasetsComponent } from '../datasets.component';

/**
 * Tab view with types of datasets view to choose
 *
 * @export
 * @class DatasetsDataPresentationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ofd-agregator-datasets-data-presentation',
  templateUrl: './datasets-data-presentation.component.html',
  styleUrls: ['./datasets-data-presentation.component.scss']
})
export class DatasetsDataPresentationComponent {
  /**
   * View reference to underline showing current method of view
   *
   * @type {ElementRef}
   * @memberof DatasetsDataPresentationComponent
   */
  @ViewChild('selector', { static: false }) public selector: ElementRef;

  /**
   * Type of data presentation
   *
   * @memberof DatasetsDataPresentationComponent
   */
  public presentation = 'list';

  /**
   * Creates an instance of DatasetsDataPresentationComponent.
   * @param {Store<AppState>} store
   * @param {DatasetsComponent} parent Parent of current component
   * @memberof DatasetsDataPresentationComponent
   */
  constructor(private store: Store<AppState>, @Host() private parent: DatasetsComponent) {}

  /**
   * Change type of data presentation
   *
   * @param {*} presentation
   * @memberof DatasetsDataPresentationComponent
   */
  selectPresentation(presentation) {
    this.presentation = presentation;

    const button: HTMLElement = document.querySelector('#view-' + presentation);
    this.changeSelectorPosition(button.offsetLeft, button.clientWidth);
    if (presentation === 'gallery') {
      this.parent.setDatasetsView(true);
    } else {
      this.parent.setDatasetsView(false);
    }
    this.store.dispatch(new DatasetsChangeViewMode(presentation));
  }

  /**
   * Change current tab selector position and width
   * @param {number} left Left offset
   * @param {number} width Width
   */
  changeSelectorPosition(left: number, width: number) {
    this.selector.nativeElement.style.transform = `translate(${left}px, 0)`;
    this.selector.nativeElement.style.width = `${width}px`;
  }
}
