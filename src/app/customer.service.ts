import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { url } from './secrets';
import { Customer } from './customer.model';
import { Product } from './product.model';
import { StoreAuthService } from './store-auth.service';

@Injectable()
export class CustomerService {
  url: string;
  headers = new HttpHeaders({
    "SiteAuth": this.storeService.store.authToken
  })

  constructor(private http: HttpClient, private storeService: StoreAuthService){
    this.url = this.getUrl() + "/stores/" + this.storeService.store.id +  "/customers";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }

  post(customer, extension = "") {
    return this.http.post(this.url + extension, {customer: customer}, {headers: this.headers})
  }

  createCustomer(name, email) {
    let customer = new Customer("", email)
    return this.post(customer)
  }
}
