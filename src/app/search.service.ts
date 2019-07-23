import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';
import { Product } from './product.model';
import { Page } from './page.model';
import { StoreAuthService } from './store-auth.service';

import { url } from './secrets';

@Injectable()
export class SearchService {

  url: string;
  headers = new HttpHeaders({
  "SiteAuth": this.storeService.store.authToken
})

  constructor(private http: HttpClient, private authService: AuthService, private storeService: StoreAuthService){
    this.url = this.getUrl() + "/searches";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  post(query, extension = "") {
    return this.http.post(this.url + extension, {query: query},{headers: this.headers})
  }

  getProducts(query, sortBy = null, min, max, pageNumber) {
    return this.post(query, "?sort_by=" + sortBy + "&min_price=" + min + "&max_price=" + max + "&page_number=" + pageNumber);
  }

}
