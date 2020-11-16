import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreAuthService } from '../store-auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class StoreModule {
  constructor () {
  }

  static forRoot(): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        {provide: StoreAuthService}
      ]
    };
  }
}
