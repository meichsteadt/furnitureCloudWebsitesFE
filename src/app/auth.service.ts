import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { url } from './secrets';

@Injectable()
export class AuthService {
  url: string;
  constructor(private http: HttpClient, private router: Router) {
    this.url = this.getUrl();
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  getUser() {
    if(localStorage.getItem("furnitureCloudAuthToken") && this.tokenNotExpired()) {
      return localStorage.getItem("furnitureCloudAuthToken")
    }
    else {
      return ""
    }
  }

  removeToken() {
    localStorage.removeItem("furnitureCloudAuthToken")
  }

  tokenNotExpired() {
    var timeStamp = parseInt(localStorage.getItem("furntiureCloudTimestamp"));
    var now = new Date();
    var difference = ((now.getTime() - timeStamp) / 1000 / 60 / 60)
    return (difference >= (24 * 7) ? false : true);
  }

  login(email, password, _this) {
  this.http.post(this.url + "/authenticate", {email: btoa(email), password: btoa(password)}).subscribe(
    token => {
      localStorage.setItem('furnitureCloudAuthToken', token['auth_token']);
      localStorage.setItem('furnitureCloudTimestamp', (new Date().getTime() + ""));
      _this.success()
    },
    error => {
      _this.error(error)
    })
  }

  logout() {
    localStorage.removeItem("furnitureCloudAuthToken");
    this.router.navigateByUrl('/login')
  }
}
