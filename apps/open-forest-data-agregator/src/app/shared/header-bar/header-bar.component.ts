import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Header-bar component
 */
@Component({
  selector: 'ofd-agregator-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
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
    this.toggle.emit(this.expanded);
  }
}
