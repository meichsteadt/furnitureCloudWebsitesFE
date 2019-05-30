import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';

import { url } from './secrets';
import { Promotion } from './promotion.model';
import { Product } from './product.model';
import { UserService} from './user.service';

declare var $: any;

@Injectable()
export class PromotionService {
  url: string;
  headers = new HttpHeaders({
  "SiteAuth": this.userService.user.token
})

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService){
    this.url = this.getUrl() + "/promotions";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getPromotions(): Promotion[] {
    var promotions = [];
    this.get().subscribe((response: Array<any>) => {
      for(var i = 0; i < response.length; i++) {
        var promotion = response[i];
        promotions.push(
          new Promotion(promotion["id"], promotion["name"], promotion["image"], promotion["discount"])
        );
      }
    }, error => console.log(error));
    return promotions;
  }

  getPromotion(promotionName) {
    return this.get("/" + promotionName)
  }

  getPromotionProducts(promotionName, pageNumber = 1, sortBy = "az", min = 0, max = 3000): Observable<any> {
    return this.get("/" + promotionName + "/products?sort_by=" + sortBy + "&page_number=" + pageNumber + "&min_price=" + min + "&max_price=" + max);
  }

  get(extension = "") {
    return this.http.get(this.url + extension, {headers: this.headers})
  }
}
