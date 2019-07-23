import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';


import { url } from './secrets';
import { storeId } from './secrets';
import { Category } from './category.model';
import { Store } from './store.model';
import { Product } from './product.model';
import { Location } from './location.model';
import { Review } from './review.model';
import { StoreAuthService } from './store-auth.service';

declare var $: any;

@Injectable()
export class SetTypeService {
  url: string;
  headers = new HttpHeaders({
  "SiteAuth": this.storeService.store.authToken
})

  constructor(private http: HttpClient, private authService: AuthService, private storeService: StoreAuthService){
    this.url = this.getUrl();
  }

  get(category, parent_category, extensions = "") {
    return this.http.get(this.url + '/parent_categories/' + parent_category + '/categories/' + category + "/set_types" + extensions, {headers: this.headers} )
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getSetTypes(categoryName, parent_category) {
    return this.get(categoryName, parent_category)
  }

  getSetProducts(setTypeName, categoryName, parent_category, sortBy = null, min, max, pageNumber): Observable<any> {
    var products: Product[] = [];
    var pages: number;
    return this.get(categoryName, parent_category, "_products/" + setTypeName + "?sort_by=" + sortBy + "&min_price=" + min + "&max_price=" + max + "&page_number=" + pageNumber);
  }
}
