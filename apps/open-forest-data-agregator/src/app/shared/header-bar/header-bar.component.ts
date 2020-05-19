import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ofd-agregator-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  @Input() iconSrc: string;

  @Input() expandable: boolean;

  @Input() expanded: boolean;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onToggle() {
    this.toggle.emit();
  }
}
