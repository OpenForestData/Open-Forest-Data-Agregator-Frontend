import { Component, Input } from '@angular/core';

@Component({
  selector: 'ofd-agregator-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  @Input() iconURL = '';
  @Input() titleText = '';
}
