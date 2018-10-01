import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { secrets } from './secrets';
import { url } from './secrets';
import { Category } from './category.model';
import { Product } from './product.model';

declare var $: any;

@Injectable()
export class CategoryService {
  url: string;
  headers = new HttpHeaders({"UserKey": secrets.key, "UserSecret": secrets.secret})

  constructor(private http: HttpClient){
    this.url = this.getUrl() + "/categories";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  parentCategories(): Category[] {
    return [
      new Category("Dining", "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/5179-90.jpg"),
      new Category("Bedroom", "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/2159-1.jpg"),
      new Category("Seating", "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/8327BE.jpg"),
      new Category("Occasional", "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/3600-31.jpg"),
      new Category("Youth", "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/B2008TF.jpg"),
      new Category("Home", "https://s3-us-west-1.amazonaws.com/homelegance-resized/Images_MidRes_For+Customer+Advertisement/5415RF-15DKT%205415RF-16RDT%205415RF-17MT%205415RF-18.jpg"),
      new Category("Mattresses", "http://www.thedump.com/content/images/thumbs/0003184_meditations-enlightenment-queen-mattress_775.jpeg")
    ]
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
