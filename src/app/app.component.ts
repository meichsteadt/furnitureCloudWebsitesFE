import { Component, isDevMode } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { EditService } from './edit.service';
import { UserService } from './user.service';
import { StoreAuthService } from './store-auth.service';
import { AuthService } from './auth.service';
import { AhoyService } from './ahoy.service';
import { Title }     from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { url } from './secrets';

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

  constructor(private editService: EditService, private storeService: StoreAuthService, private titleService: Title, private ahoy: AhoyService, private router: Router, private authGuardService: AuthGuardService, private auth: AuthService) {
    let hostUrl = window.location.hostname;
    // let hostUrl = "royalfurniturefresno.com"

    this.storeService.getStoreAuth(hostUrl, this).then((res) => {
      this.titleService.setTitle(res["store"]["name"]);
      document.getElementById("favicon").setAttribute('href', res["store"]["favicon"]);
      this.ready = true;
      this.ahoy.init();
      this.ahoy.trackSubmits();
      this.ahoy.trackView();
    });

    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart && this.auth.authToken) {
        this.edit = true;
      }
    })
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }
}
