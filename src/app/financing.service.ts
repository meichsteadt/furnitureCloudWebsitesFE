import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

import { url } from './secrets';
import { Financing } from './financing.model';

@Injectable()
export class FinancingService {
  url: string;
  headers = new HttpHeaders({"Authorization": this.authService.getUser()})

  constructor(private http: HttpClient, private authService: AuthService){
    this.url = this.getUrl() + "/financings";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getFinancings(): Financing[] {
    var financings: Financing[] = [];
    this.get().subscribe((response: Array<any>) => {
      for (var i = 0; i < response.length; i++) {
        var financing = response[i];
        financings.push(new Financing(
          financing["name"],
          financing["logo"],
          financing["credit_needed"],
          financing["length"],
          financing["bank_account"]
        ))
      }
    }, error => {});
    return financings;
  }


  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
