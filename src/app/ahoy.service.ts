import { Injectable, isDevMode } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { StoreAuthService } from './store-auth.service';

import { url } from './secrets';
declare var ahoy;

@Injectable({
  providedIn: 'root',
})
export class AhoyService {
  url: string;
  visitId: string;
  storeService: StoreAuthService;
  headers: HttpHeaders = new HttpHeaders({
    "SiteAuth": null
  })

  constructor(_storeService: StoreAuthService){
    this.storeService = _storeService;
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  debug() {
    ahoy.debug();
  }

  init(utm_campaign = null, utm_source=null) {
    ahoy.configure({
      urlPrefix: this.getUrl(),
      visitsUrl: "/ahoy/visits",
      eventsUrl: "/ahoy/events",
      withCredentials: false,
      visitParams: {store_id: this.storeService.store.id},
      headers: {"SiteAuth": this.storeService.store.authToken}
    });
    ahoy.start();
    this.visitId = ahoy.getVisitId();
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
