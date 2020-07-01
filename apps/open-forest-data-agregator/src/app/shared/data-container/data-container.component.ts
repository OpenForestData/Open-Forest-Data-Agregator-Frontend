import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ofd-agregator-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss']
})
export class DataContainerComponent implements OnInit {
  /**
   * Icon source
   */
  @Input() iconSrc: string;
  /**
   * Expandable toggle
   */
  @Input() expandable: boolean;
  /**
   * Expanded value
   */
  @Input() expanded: boolean;
  /**
   * title
   */
  @Input() title: string;
  /**
   * Toggle event emitter
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Data-container constructor
   */
  constructor() {}

  /**
   * Initialize at the start
   */
  ngOnInit(): void {}

  /**
   * Toggle expanded view
   */
  onToggle() {
    this.expanded = !this.expanded;
    this.toggle.emit();
  }
}
