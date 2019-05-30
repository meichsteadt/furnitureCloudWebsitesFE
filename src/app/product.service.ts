import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

import { url } from './secrets';
import { Product } from './product.model';
import { UserService} from './user.service';

@Injectable()
export class ProductService {
  url: string;
  headers = new HttpHeaders({
  "SiteAuth": this.userService.user.token
})

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService){
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
          new Product(product["id"], product["name"], product["image"], product["description"], product["thumbnail"], price, product["set_name"])
        );
      }
    });
    return {products: products, pages: pages[0]}
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
