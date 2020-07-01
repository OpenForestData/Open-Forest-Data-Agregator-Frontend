import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ofd-agregator-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss']
})
export class DataContainerComponent implements OnInit {
  @Input() iconSrc: string;

  @Input() expandable: boolean;

  @Input() expanded: boolean;

  @Input() title: string;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Toggle expanded view
   */
  onToggle() {
    this.expanded = !this.expanded;
    this.toggle.emit();
  }
}
