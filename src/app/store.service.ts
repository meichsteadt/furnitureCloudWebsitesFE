import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';


import { url } from './secrets';
import { Category } from './category.model';
import { Store } from './store.model';
import { Location } from './location.model';
import { Review } from './review.model';
import { UserService} from './user.service';
import { StoreAuthService } from './store-auth.service';


declare var $: any;

@Injectable()
export class StoreService {
  store = this.storeService.store;
  url: string;
  stores: Store[] = [];
  authenticated: Boolean = false;
  headers = new HttpHeaders({
    "SiteAuth": this.storeService.store.authToken
  })

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService, private storeService: StoreAuthService){
    this.url = this.getUrl() + "/stores";
  }

  login() {

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
          store["auth_token"],
          store["id"],
          store["name"],
          store["logo"],
          store["favicon"],
          store["yelp"],
          store["facebook"],
          store["instagram"],
          store["twitter"],
          store["google_reviews_id"],
          store["yellow_pages"],
          store["google_maps"],
          store["email"]
        ))
      }
    }, error => console.log(error));
    return stores;
  }

  getLocations(): Location[] {
    var locations = [];
    this.get("/" + this.store.id + "/locations").subscribe((response: Array<any>) => {
      for(var i = 0; i < response.length; i++) {
        var store = response[i];
        locations.push(new Location(
          store["name"],
          store["address"],
          store["city"],
          store["state"],
          store["zip"],
          store["phone"],
          store["email"],
          store["hours"]
        ))
      }
    }, error => console.log(error));
    return locations;
  }

  getStore(): Observable<any> {
    return this.get("/" + this.store.id);
  }

  getImages(): String[] {
    var images: String[] = [];
    this.get("/" + this.store.id + "/images").subscribe((response: Array<any>) => {
      for (let i = 0; i < response.length; i++) {
        images.push(response[i]);
      }
    }, error => {}, () => {})
    return images;
  }

  getReviews(): Review[] {
    var reviews: Review[] = [];
    this.get("/" + this.store.id + "/reviews").subscribe((response: Array<any>) => {
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

  authenticate(url) {
    return this.http.post(this.getUrl() + "/authenticate_site", {authentication: this.authService.getStoreInfo(url)})
  }

  getStoreLocal() {
    return this.store;
  }

  requestInfo(name, email, productId, note) {
    let infoRequest = {name: name, email: email, product_id: productId}
    return this.http.post(this.url + "/" + this.store.id + "/info_requests", {info_request: infoRequest}, {headers: this.headers})
  }

  returnEmail() {
    return new Promise((resolve, reject) => {
      resolve(this.store.email);
    })
  }
}
