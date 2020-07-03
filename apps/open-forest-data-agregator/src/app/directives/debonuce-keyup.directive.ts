import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
/**
 * Provides debounce for keyUp event
 *
 * @export
 * @class DebounceKeyupDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[debounceInput]'
})
export class DebounceKeyupDirective implements OnInit, OnDestroy {
  /**
   * Debounce time before events fire
   *
   * @memberof DebounceKeyupDirective
   */
  @Input() debounceTime = 500;
  /**
   * Event emiter for decounce
   *
   * @memberof DebounceKeyupDirective
   */
  @Output() debounceInput = new EventEmitter();

  /**
   * Holds debounce events
   *
   * @private
   * @memberof DebounceKeyupDirective
   */
  private clicks = new Subject();

  /**
   * Subscription for observable objects
   *
   * @private
   * @type {Subscription}
   * @memberof DebounceKeyupDirective
   */
  private subscription: Subscription;

  /**
   * Adds observable for keyup events
   *
   * @memberof DebounceKeyupDirective
   */
  ngOnInit() {
    this.subscription = this.clicks.pipe(debounceTime(this.debounceTime)).subscribe(e => this.debounceInput.emit(e));
  }

  /**
   * Unsubscribie all subscriptions
   *
   * @memberof DebounceKeyupDirective
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Binds key up, and catchs all events to array
   *
   * @param {*} event
   * @memberof DebounceKeyupDirective
   */
  @HostListener('keyup', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
