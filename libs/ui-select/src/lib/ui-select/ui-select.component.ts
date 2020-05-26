import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

export interface IUISelectOptions {
  bold?: boolean;
  class?: string;
  placeholder?: string;
}

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.component.html',
  styleUrls: ['./ui-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UISelectComponent implements OnInit, OnChanges {
  @ViewChild('selectRef', { static: false }) public selectRef: any;

  @Input() public items: any[] = [];

  @Input() public value: any = null;

  @Output() public valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() public valueName = 'value';

  @Input() public displayName = 'name';

  @Input() public options?: IUISelectOptions = {};

  @Input() public closeOnInput = false;

  public isOpen = false;

  public selectedIndex = -1;

  private defaultOptions: IUISelectOptions = {
    bold: true,
    placeholder: 'Choose'
  };

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this.selectRef.nativeElement.contains(event.target) && this.isOpen) {
      this.close();
    }
  }

  constructor(public changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.options = { ...this.defaultOptions, ...this.options };

    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges() {
    if (this.closeOnInput) {
      this.close();
    }

    this.changeDetectorRef.detectChanges();
  }

  selectValue(value: any, index: number = 0) {
    this.isOpen = false;
    this.value = value;
    this.selectedIndex = index;
    this.valueChange.emit(value);
    this.changeDetectorRef.detectChanges();
  }

  close() {
    this.isOpen = false;
    this.changeDetectorRef.detectChanges();
  }

  isSelected(item) {
    return this.value === (item[this.valueName] ? item[this.valueName] : item);
  }

  openSelect() {
    this.isOpen = true;

    this.changeDetectorRef.detectChanges();
  }
}
