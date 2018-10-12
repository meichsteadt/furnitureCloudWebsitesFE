import { ModuleWithProviders, Input }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CategoriesProductsComponent } from './categories-products/categories-products.component';
import { PromotionsProductsComponent } from './promotions-products/promotions-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MattressDetailsComponent } from './mattress-details/mattress-details.component';
import { MattressesComponent } from './mattresses/mattresses.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { FinancingComponent } from './financing/financing.component';


const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'promotions/:id',
    component: PromotionsProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories/mattresses',
    component: MattressesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories/:parentCategory',
    component: SubCategoriesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories/:parentCategory/:categoryName',
    component: CategoriesProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'mattresses/:id',
    component: MattressDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'about-us',
    component: StoreDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'financing',
    component: FinancingComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
