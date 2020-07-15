import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Cart } from './cart.model';
import { Product } from './product.model';
import { AuthService } from './auth.service';
import { AhoyService } from './ahoy.service';
import { StoreAuthService } from './store-auth.service';

import { url } from './secrets';
declare var $: any;

@Injectable()
export class CartService {
  url: string;
  cart: Cart;
  headers = new HttpHeaders({
    "SiteAuth": this.storeService.store.authToken
  })

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ahoy: AhoyService,
    private storeService: StoreAuthService
  ){
    this.url = this.getUrl() + "/carts";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getCart(callback) {
    if(this.cart != null) {
      return this.cart
    }
    else {
      this.getInitial().subscribe(res => {
        this.cart = new Cart(
          res["id"],
          this.ahoy.visitId,
          []
        )
      }, err => {console.log(err)}, () => callback(this.cart));
    }
  }

  getCartItems(cart, callback) {
    var products: Product[] = [];

    let extension = "/" + cart.id + "/products"

    this.get(extension).subscribe((response: Object) => {
      console.log(response)
      for(var i = 0; i < response["arr"].length; i++) {
        var product = response["arr"][i]["product"];
        var price = response["arr"][i]["set_price"];
        products.push(
          new Product(product["id"], product["name"], product["images"], product["description"], product["thumbnail"], price, product["set_name"], null, null, null)
        );
      }
    }, err=> {console.log(err)}, ()=> {
      callback(products);
      this.cart.products = products;
      console.log(this.cart.products);
    });
  }

  getInitial() {
    let url = this.getUrl() + "/visits/" + this.ahoy.visitId + "/carts";
    return this.http.get(url, {headers: this.headers})
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
