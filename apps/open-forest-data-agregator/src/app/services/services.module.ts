import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageService } from './language.service';
/**
 * Loads others services as singleton
 *
 * @export
 * @class ServicesModule
 */
@NgModule({
  imports: [CommonModule],
  providers: [LanguageService]
})
export class ServicesModule {
  /**
   * Check if instance already exists
   * @param {ServicesModule} parentModule
   * @memberof ServicesModule
   */
  constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
    if (parentModule) {
      throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
    }
  }

  /**
   * Return providers for root
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof ServicesModule
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [LanguageService]
    };
  }
}
