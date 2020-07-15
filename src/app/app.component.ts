import { Component, isDevMode } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { EditService } from './edit.service';
import { UserService } from './user.service';
import { StoreAuthService } from './store-auth.service';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { AhoyService } from './ahoy.service';
import { Title }     from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { url } from './secrets';
import {URLSearchParams} from '@angular/http';

declare var ahoy;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ready: boolean = false;
  navigated: boolean = false;
  prevUrl: string;
  edit: boolean = false;
  urlParams = {};

  constructor(private editService: EditService,
              private storeService: StoreAuthService,
              private titleService: Title,
              private ahoy: AhoyService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private authGuardService: AuthGuardService,
              private auth: AuthService) {
    let hostUrl = window.location.hostname;
    // let hostUrl = "royalfurniturefresno.com"

    // Manually searching through the url query params because it ngular wont find them??
    var loc:string = window.location.search;
    if(loc.length > 0) {
      var pairs = loc.split("?")[1].split("&");
      for (let i = 0; i < pairs.length; i++) {
        const split = pairs[i].split("=");
        var key = split[0];
        var val = split[0];
        this.urlParams[key] = val;
      }
    }

    this.storeService.getStoreAuth(hostUrl, this).then((res) => {
      this.titleService.setTitle(res["store"]["name"]);
      document.getElementById("favicon").setAttribute('href', res["store"]["favicon"]);
      this.ready = true;
      this.ahoy.init(this.urlParams["utm_campaign"], this.urlParams["platform"]);
      this.ahoy.trackSubmits();
      this.ahoy.trackView();
    });

    this.router.events.subscribe(event => {
      // if(event instanceof NavigationStart && this.auth.authToken) {
      //   this.edit = true;
      // }
    })

    // this.router.navigateByUrl("/");
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }
}
