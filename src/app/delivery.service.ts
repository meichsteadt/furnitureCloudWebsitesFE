import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

import { url } from './secrets';
import { storeId } from './secrets';
import { Delivery } from './delivery.model';
import { StoreAuthService } from './store-auth.service';
@Injectable()
export class DeliveryService {
  url: string;
  store = this.storeService.store;
  headers = new HttpHeaders({
    "SiteAuth": this.storeService.store.authToken
  })

  constructor(private http: HttpClient, private authService: AuthService, private storeService: StoreAuthService){
    this.url = this.getUrl() + "/stores/" + this.store.id + "/deliveries";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getDeliveries() {
    var deliveries: Delivery[] = [];
    this.get().subscribe((response: Array<any>) => {
      for (let i = 0; i < response.length; i++) {
        var delivery = response[i];
        deliveries.push(new Delivery(
          delivery["name"],
          delivery["price"]
        ))
      }
    })
    return deliveries;
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
