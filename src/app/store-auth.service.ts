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

declare var $: any;

@Injectable()
export class StoreAuthService {
  store;

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService){

  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  authenticate(url) {
    return this.http.post(this.getUrl() + "/authenticate_site", {authentication: this.authService.getStoreInfo(url)})
  }

  getStoreLocal() {
    return this.store;
  }

  getStoreAuth(url, __this: any) {
    return new Promise((resolve, reject) =>  {
      if(!this.store) {
        let store;
        this.authenticate(url).subscribe(response => {
          store = new Store(
            response["auth_token"],
            response["store"]["id"],
            response["store"]["name"],
            response["store"]["logo"],
            response["store"]["favicon"],
            response["store"]["yelp"],
            response["store"]["facebook"],
            response["store"]["instagram"],
            response["store"]["twitter"],
            response["store"]["google_reviews_id"],
            response["store"]["yellow_pages"],
            response["store"]["google_maps"],
            response["store"]["email"]
          );
          this.store = store;
          resolve({store: store, this: __this});
        }, error => {});
      }
      else {
        resolve(this.store)
      }
    })
  }
}
