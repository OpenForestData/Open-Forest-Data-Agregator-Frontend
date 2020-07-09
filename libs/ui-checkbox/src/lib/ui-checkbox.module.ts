import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UICheckboxComponent } from './ui-checkbox/ui-checkbox.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [UICheckboxComponent],
  exports: [UICheckboxComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UICheckboxComponent),
      multi: true
    }
  ]
})
export class UICheckboxModule {}
