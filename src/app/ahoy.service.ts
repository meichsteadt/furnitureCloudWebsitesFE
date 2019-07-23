import { Injectable, isDevMode } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { StoreAuthService } from './store-auth.service';

import { url } from './secrets';
declare var ahoy;

@Injectable()
export class AhoyService {
  url: string;

  headers = new HttpHeaders({
    "SiteAuth": null
  })

  constructor(private storeService: StoreAuthService){
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  init() {
    ahoy.configure({
      urlPrefix: this.getUrl(),
      visitsUrl: "/ahoy/visits",
      eventsUrl: "/ahoy/events",
      withCredentials: false,
      headers: {"SiteAuth": this.storeService.store.authToken}
    });
    ahoy.start();
  }

  trackView(addData = null) {
    this.track("view", addData)
  }

  trackClicks(addData = null) {
    this.track("clicks", addData)
  }

  trackSubmits(addData = null) {
    this.track("submits", addData)
  }

  trackChanges(addData = null) {
    this.track("changes", addData)
  }

  getVisitId() {
    return ahoy.getVisitId();
  }

  track(event, addData = null) {
    if(!this.getVisitId()) {
      this.init();
    }
    if(event == "clicks") {
      ahoy.trackClicks();
    }
    else if(event === "changes") {
      ahoy.trackChanges();
    }
    else if(event === "view") {
      ahoy.trackView(addData);
    }
    else if(event === "submits") {
      ahoy.trackSubmits();
    }
  }

  trackUniq(name, props) {
    ahoy.track(name, props)
  }
}
