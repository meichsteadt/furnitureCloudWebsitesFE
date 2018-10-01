import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { secrets } from './secrets';
import { url } from './secrets';
import { storeId } from './secrets';
import { Delivery } from './delivery.model';

@Injectable()
export class DeliveryService {
  url: string;
  headers = new HttpHeaders({"UserKey": secrets.key, "UserSecret": secrets.secret})

  constructor(private http: HttpClient){
    this.url = this.getUrl() + "/stores/" + storeId + "/deliveries";
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
