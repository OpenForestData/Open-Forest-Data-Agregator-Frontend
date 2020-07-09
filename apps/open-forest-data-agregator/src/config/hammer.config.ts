import { HammerGestureConfig } from '@angular/platform-browser';
import * as hammer from 'hammerjs';

/**
 * HammerJS Config
 *
 * @export
 * @class HammerConfig
 * @extends {HammerGestureConfig}
 */
export class HammerConfig extends HammerGestureConfig {
  /**
   * Hammer options
   *
   * @memberof HammerConfig
   */
  overrides = {
    swipe: { direction: hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false }
  } as any;
}
