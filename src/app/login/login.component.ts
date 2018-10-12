import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(email, password) {
    $('.error').hide();
    var token = this.authService.login(email, password, this);
  }

  success() {
    this.router.navigateByUrl('/')
  }

  error(error) {
    console.log(error);
    $('.error').show();
  }

}
