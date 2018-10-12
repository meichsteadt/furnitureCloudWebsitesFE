import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

import { url } from './secrets';
import { Mattress } from './mattress.model';
import { Size } from './size.model';

@Injectable()
export class MattressService {
  url: string;
  headers = new HttpHeaders({"Authorization": this.authService.getUser()})

  constructor(private http: HttpClient, private authService: AuthService){
    this.url = this.getUrl() + "/mattresses";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getMattresses(size, minPrice, maxPrice) {
    var mattresses: Mattress[] = [];
    var pages: number;
    this.get(`?size=${size}&min_price=${minPrice}&max_price=${maxPrice}`).subscribe((response: Object) => {
      for (let i = 0; i < response["arr"].length; i++) {
        var mattress = response["arr"][i]["mattress"];
        var price = response["arr"][i]["price"];
        mattresses.push(new Mattress(
          mattress["id"],
          mattress["name"],
          mattress["comfort"],
          mattress["image"],
          mattress["description"],
          mattress["warranty"],
          mattress["brand_id"],
          price["price"],
          price["name"]
        ))
      }
    })
    return mattresses;
  }

  getMattress(id) {
    return this.get(`/${id}`)
  }

  getSizes(id) {
    var sizes: Size[] = [];
    this.get(`/${id}/sizes`).subscribe((response: Array<any>) => {
      for (let i = 0; i < response.length; i++) {
        sizes.push(new Size(
          response[i]["name"],
          response[i]["price"],
          response[i]["mat_only"]
        ));
      }
    })
    return sizes;
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
