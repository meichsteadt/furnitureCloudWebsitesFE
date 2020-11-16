import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhoyService } from '../ahoy.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AhoyModule {
  constructor () {
  }

  static forRoot(): ModuleWithProviders<AhoyModule> {
    return {
      ngModule: AhoyModule,
      providers: [
        {provide: AhoyService}
      ]
    };
  }
}
