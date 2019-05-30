import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';


import { url } from './secrets';
import { storeId } from './secrets';
import { Category } from './category.model';
import { Store } from './store.model';
import { Review } from './review.model';
import { UserService} from './user.service';

declare var $: any;

@Injectable()
export class StoreService {
  url: string;
  stores: Store[] = [];
  authenticated: Boolean = false;
  headers = new HttpHeaders({
  "SiteAuth": this.userService.user.token
})

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService){
    this.url = this.getUrl() + "/stores";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getStores(): Store[] {
    var stores = [];
    this.get().subscribe((response: Array<any>) => {
      for(var i = 0; i < response.length; i++) {
        var store = response[i];
        stores.push(new Store(
          store["name"],
          store["address"],
          store["city"],
          store["state"],
          store["zip"],
          store["phone"],
          store["email"],
          store["hours"],
          store["google_maps"]
        ))
      }
    }, error => console.log(error));
    return stores;
  }

  getStore(): Observable<any> {
    return this.get("/" + storeId);
  }

  getImages(): String[] {
    var images: String[] = [];
    this.get("/" + storeId + "/images").subscribe((response: Array<any>) => {
      for (let i = 0; i < response.length; i++) {
        images.push(response[i]);
      }
    }, error => {}, () => {})
    return images;
  }

  getReviews(): Review[] {
    var reviews: Review[] = [];
    this.get("/" + storeId + "/reviews").subscribe((response: Array<any>) => {
      for (let i = 0; i < response.length; i++) {
        var review = response[i];
        reviews.push(new Review(
          review["name"],
          review["review"],
          review["stars"]
        ));
      }
    }, error => {}, () => {})
    return reviews;
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
