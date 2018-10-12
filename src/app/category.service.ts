import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

import { url } from './secrets';
import { Category } from './category.model';
import { Product } from './product.model';

declare var $: any;

@Injectable()
export class CategoryService {
  url: string;
  headers = new HttpHeaders({"Authorization": this.authService.getUser()})

  constructor(private http: HttpClient, private authService: AuthService){
    this.url = this.getUrl() + "/categories";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  parentCategories(): Category[] {
    var parentCategories: Category[] = []
    this.http.get(this.getUrl() + "/parent_categories", {headers: this.headers}).subscribe((response: Array<any>) => {
      for(var i = 0; i < response.length; i++) {
        var parentCategory = response[i];
        parentCategories.push(
          new Category(
            parentCategory["id"],
            parentCategory["name"],
            parentCategory["image"]
          )
        )
      }
    })
    return parentCategories;
  }
  //
  // getCategories(): Observable<any> {
  //   return this.get()
  // }

  getCategories(parentCategory): Category[] {
    var categories: Category[] = [];
    this.get("/" + parentCategory).subscribe((response: Array<any>) => {
      for(var i = 0; i < response.length; i++) {
        var category = response[i];
        categories.push(
          new Category(
            category["id"],
            category["name"],
            category["image"]
          )
        )
      }
    }, error => console.log(error));
    return categories;
  }

  getCategoryProducts(categoryName, parent_category, sortBy = null, min, max): Object {
    var products: Product[] = [];
    var pages: number;
    this.get("_products/" + categoryName + "?parent_category=" + parent_category + "&sort_by=" + sortBy + "&min_price=" + min + "&max_price=" + max).subscribe((response: Array<any>) => {
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

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
