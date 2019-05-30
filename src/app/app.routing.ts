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
import { SearchComponent } from './search/search.component';


const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'promotions/:id',
    component: PromotionsProductsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'categories/mattresses',
    component: MattressesComponent
  },
  {
    path: 'categories/:parentCategory',
    component: SubCategoriesComponent
  },
  {
    path: 'categories/:parentCategory/:categoryName',
    component: CategoriesProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'mattresses/:id',
    component: MattressDetailsComponent
  },
  {
    path: 'about-us',
    component: StoreDetailsComponent
  },
  {
    path: 'financing',
    component: FinancingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search/:query',
    component: SearchComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
