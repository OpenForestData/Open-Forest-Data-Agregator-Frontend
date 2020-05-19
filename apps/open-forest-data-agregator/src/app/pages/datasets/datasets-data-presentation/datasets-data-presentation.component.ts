import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ofd-agregator-datasets-data-presentation',
  templateUrl: './datasets-data-presentation.component.html',
  styleUrls: ['./datasets-data-presentation.component.scss']
})
export class DatasetsDataPresentationComponent implements OnInit {
  @ViewChild('selector', { static: false }) public selector: ElementRef;

  public presentation = 'list';

  constructor() {}

  ngOnInit(): void {}

  selectPresentation(presentation) {
    this.presentation = presentation;

    const button = document.querySelector('#view-' + presentation) as HTMLElement;
    this.changeSelectorPosition(button.offsetLeft, button.clientWidth);
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
