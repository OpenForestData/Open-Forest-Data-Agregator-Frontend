import {
  Component,
  OnInit,
  ElementRef,
  Input,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  Output,
  EventEmitter
} from '@angular/core';

import { UIModalService } from './ui-modal.service';
import { isPlatformBrowser } from '@angular/common';

/**
 * Modal Component
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss']
})
export class UIModalComponent implements OnInit, OnDestroy {
  /**
   * Modal ID
   */
  @Input() id: string;

  /**
   * Show close button
   */
  @Input() showClose = false;

  /**
   * Animation direction
   */
  @Input() direction = 'up';

  @Output() hasClosed: EventEmitter<any> = new EventEmitter();

  /**
   * Modal native element
   */
  private element: any;

  /**
   * Close modal duration in ms
   */
  private closeModalDuration = 300;

  /**
   * Set element as modal native element
   * @param {UIModalService} modalService UI Modal Service
   * @param {ElementRef} el Element Ref
   */
  constructor(
    public modalService: UIModalService,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.element = this.el.nativeElement;
  }

  /**
   * Prepare modal
   */
  ngOnInit(): void {
    if (!this.id) {
      return;
    }

    // Check if platform is browser
    if (isPlatformBrowser(this.platformId)) {
      /**
       * Add modal to body
       */
      document.body.appendChild(this.element);

      /**
       * Add event listener to click out of modal
       */
      this.element.addEventListener('mousedown', (e: any) => {
        if (e.target.classList.contains('modal')) {
          this.modalService.close(this.id);
        }
      });

      /**
       * Register new modal
       */
      this.modalService.add(this);
    }
  }

  /**
   * Remove modal after component was destroyed
   */
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  /**
   * Open modal
   */
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  /**
   * Close modal
   */
  close(): void {
    document.body.classList.add('modal-closed');
    this.hasClosed.emit();
    setTimeout(() => {
      this.element.style.display = 'none';
      document.body.classList.remove('modal-open');
      document.body.classList.remove('modal-closed');
    }, this.closeModalDuration);
  }
}
