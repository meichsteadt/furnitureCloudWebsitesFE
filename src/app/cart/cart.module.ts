import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CartModule {
  constructor () {
  }

  static forRoot(): ModuleWithProviders<CartModule> {
    return {
      ngModule: CartModule,
      providers: [
        {provide: CartService}
      ]
    };
  }
}
