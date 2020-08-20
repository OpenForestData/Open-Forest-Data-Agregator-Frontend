import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './ui-checkbox.component.html',
  styleUrls: ['./ui-checkbox.component.scss']
})
export class UICheckboxComponent implements OnInit {
  @Input() name: any;
  @Input() model: boolean;
  @Input() invert = false;
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange() {
    this.modelChange.emit(this.model);
  }
}
