import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { secrets } from './secrets';
import { url } from './secrets';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  url: string;
  headers = new HttpHeaders({"UserKey": secrets.key, "UserSecret": secrets.secret})

  constructor(private http: HttpClient){
    this.url = this.getUrl() + "/products";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getProducts() {
    var products: Product[] = [];
    var pages: number;
    this.get().subscribe((response: Object) => {
      pages = response["pages"];
      for(var i = 0; i < response["arr"].length; i++) {
        var product = response["arr"][i]["product"];
        var price = response["arr"][i]["set_price"];
        products.push(
          new Product(product["id"], product["name"], product["image"], product["description"], product["thumbnail"], price, product["set_name"])
        );
      }
    });
    return {products: products, pages: pages}
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
