import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideModule } from 'ng-click-outside';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { UISelectComponent } from './ui-select/ui-select.component';

@NgModule({
  imports: [CommonModule, ClickOutsideModule, AngularSvgIconModule],
  exports: [UISelectComponent],
  declarations: [UISelectComponent]
})
export class UISelectModule {}
