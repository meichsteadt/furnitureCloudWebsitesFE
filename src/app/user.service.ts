import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';
import { User } from './user.model';

import { url } from './secrets';

@Injectable()
export class UserService {
  url: string;
  user: User;

  constructor(private http: HttpClient, private authService: AuthService){
    this.url = this.getUrl() + "/authenticate_site";
  }

  getUrl() {
    return isDevMode()? url.devUrl : url.prodUrl;
  }

  login() {
    return this.http.post(this.url, {authentication: this.authService.getUserInfo()})
  }

  getUser() {
    return new Promise((resolve, reject) =>  {
      if(!this.user) {
        let user;
        this.login().subscribe(response => {
          user = new User(response["auth_token"], response["name"]);
          this.user = user;
          resolve(user);
        });
      }
      else {
        resolve(this.user)
      }
    })
  }
}
