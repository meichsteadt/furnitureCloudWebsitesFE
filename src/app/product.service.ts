import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

import { url } from './secrets';
import { Product } from './product.model';
import { StoreAuthService} from './store-auth.service';

@Injectable()
export class ProductService {
  url: string;
  headers = new HttpHeaders({
  "SiteAuth": this.storeService.store.authToken
})

  constructor(private http: HttpClient, private authService: AuthService, private storeService: StoreAuthService){
    this.url = this.getUrl() + "/products";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getProducts() {
    var products: Product[] = [];
    var pages: number[] = [];
    this.get().subscribe((response: Object) => {
      pages.push(response["pages"]);
      for(var i = 0; i < response["arr"].length; i++) {
        var product = response["arr"][i]["product"];
        var price = response["arr"][i]["set_price"];
        products.push(
          new Product(product["id"], product["name"], product["images"], product["description"], product["thumbnail"], price, product["set_name"], null, null, null)
        );
      }
    });
    return {products: products, pages: pages[0]}
  }

  popularProducts(): Observable<any> {
    return this.http.get(this.getUrl() + "/popular_products", {headers: this.headers})
  }

  getProduct(productId) {
    return this.get("/" + productId)
  }

  getProductItems(productId) {
    return this.get("/" + productId + "/product_items")
  }

  getRelatedProducts(productId) {
    return this.get("/" + productId + "/related_products")
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
