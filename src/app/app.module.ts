import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CartService } from './cart.service';
import { CartModule } from './cart/cart.module';
import { StoreModule } from './store/store.module';
import { StoreAuthService } from './store-auth.service';
import { EditService } from './edit.service';
import { AhoyService } from './ahoy.service';
import { AhoyModule } from './ahoy/ahoy.module';

import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { LandingPromotionsComponent } from './landing-promotions/landing-promotions.component';
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
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { MailChimpComponent } from './mail-chimp/mail-chimp.component';
import { SetTypesComponent } from './set-types/set-types.component';
import { SetTypesProductsComponent } from './set-types-products/set-types-products.component';
import { EmailSignupComponent } from './email-signup/email-signup.component';
import { RequestInfoComponent } from './request-info/request-info.component';

import { SafePipe } from './safe.pipe';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

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
    SearchComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    NavTopComponent,
    MailChimpComponent,
    LandingPromotionsComponent,
    SetTypesComponent,
    SetTypesProductsComponent,
    EmailSignupComponent,
    RequestInfoComponent,
    SafePipe,
    PopularProductsComponent,
    CartComponent,
    CartItemComponent,
    AddToCartComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(),
    AhoyModule.forRoot(),
    CartModule.forRoot(),
    HttpModule
  ],
  providers: [AuthGuardService, AuthService, CartService, EditService, UserService, Title, StoreAuthService, AhoyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
