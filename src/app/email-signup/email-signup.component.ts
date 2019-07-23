import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

declare var $: any;

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.scss'],
  providers: [CustomerService]
})
export class EmailSignupComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  onSubmit(email) {
    $("#error").text("")
    $("#email-form .input-field").css("margin-bottom", 0)
    this.customerService.createCustomer("", email).subscribe(res => {

    }, error => this.handleError(error), () => this.success())
  }

  handleError(error) {
    $("#error").text("Oops! Something went wrong. You might have already signed up.")
    let errorHeight = $("#error").height();
    $("#email-form .input-field").css("margin-bottom", errorHeight)
  }

  success() {
    $("#email-form").hide();
    $(".copy").hide();
    $("#email-success").show();
    $("#email-success").text("Awesome! You've been added to our list! Expect something soon.")
  }
}
