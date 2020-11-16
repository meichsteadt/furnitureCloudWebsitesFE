import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Cart } from './cart.model';
import { Product } from './product.model';
import { AuthService } from './auth.service';
import { AhoyService } from './ahoy.service';
import { StoreAuthService } from './store-auth.service';
import { BehaviorSubject } from 'rxjs';

import { url } from './secrets';
declare var $: any;


@Injectable()

export class CartService {
  url: string;
  cart: Cart;
  storeService: StoreAuthService;
  private cartSource = new BehaviorSubject([]);
  cartProducts = this.cartSource.asObservable();

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ahoy: AhoyService,
    private _storeService: StoreAuthService)
    {
      this.url = this.getUrl() + "/carts";
      this.storeService = _storeService;
    }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  changeMessage(products: Product[]) {
    // this.messageSource.next(products)
  }

  getCart() {
    return new Promise((resolve, reject) =>  {
      if(this.cart != null) {
        resolve(this.cart);
      }
      else {
        this.getInitial().then(res => {
          console.log(res);

          this.cart = new Cart(
            res["id"],
            this.ahoy.visitId,
            []
          )
          resolve(this.cart);
        });
      }
    });
  }

  getCartItems(callback = null) {
    var asyncFunc = async () => {
      const result = await this.getCart();
      return result;
    }

    return asyncFunc().then(cart => {
      console.log("in async");
      let extension = "/" + this.cart.id + "/products"
      var newProducts = [];
      this.get(extension).subscribe(products => {
        for(var i = 0; i < products["arr"].length; i++) {
          var product = products["arr"][i]["product"];
          var price = products["arr"][i]["set_price"];
          newProducts.push(
            new Product(product["id"], product["name"], product["images"], product["description"], product["thumbnail"], price, product["set_name"], null, null, null)
          );
        }
        console.log(newProducts);
        this.cartSource.next(newProducts);
      }, err=> {console.log(err)}
      );
    });
  }

  addToCart(productId, callback = null) {
    return this.post("/" + this.cart.id + "/cart_items", {cart_item: {product_id: productId}}).subscribe(
      res => this.cartSuccess(res),
      err => this.cartError(err),
      () => {if(callback){ callback()}},
    );
  }

  cartSuccess(res) {
    console.log("success");
    this.getCartItems();
  }

  cartError(err) {
    console.log(err);
  }

  getInitial() {
    return new Promise((resolve, reject) =>  {
      this.headers = new HttpHeaders({
        "SiteAuth": this.storeService.store.authToken
      })
      let url = this.getUrl() + "/visits/" + this.ahoy.visitId + "/carts";
      this.http.get(url, {headers: this.headers}).subscribe(res => {
          resolve(res);
        }, error => {});
    })
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }

  post(extension = "", post_data) {
    return this.http.post(this.url + extension, post_data, {headers: this.headers})
  }
}
