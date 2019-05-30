import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { EditService } from './edit.service';

import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesProductsComponent } from './categories-products/categories-products.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MattressDetailsComponent } from './mattress-details/mattress-details.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { FinancingComponent } from './financing/financing.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MattressesComponent } from './mattresses/mattresses.component';
import { PromotionsProductsComponent } from './promotions-products/promotions-products.component';
import { EditSlideoutComponent } from './edit-slideout/edit-slideout.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LandingPageComponent,
    PromotionsComponent,
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    NavSearchComponent,
    CategoriesComponent,
    CategoriesProductsComponent,
    BreadcrumbsComponent,
    ProductDetailsComponent,
    MattressDetailsComponent,
    StoreDetailsComponent,
    SubCategoriesComponent,
    FinancingComponent,
    ReviewsComponent,
    MattressesComponent,
    PromotionsProductsComponent,
    LoginComponent,
    EditSlideoutComponent,
    SearchComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AuthGuardService, AuthService, EditService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
