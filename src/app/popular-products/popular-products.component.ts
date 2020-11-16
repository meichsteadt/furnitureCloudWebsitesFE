import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AhoyService } from '../ahoy.service';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/finally';
import { Product } from '../product.model';

declare var $:any;

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss'],
  providers: [ProductService]
})
export class PopularProductsComponent implements OnInit, AfterViewInit {
  products;
  pages;
  perPanel;
  initFire: boolean = false;
  @Input() layout: string;
  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.setPanels();
    this.products = [];
    this.productService.popularProducts().subscribe((response: Object) => {
      this.pages = response["pages"];
      if(this.layout == "flat") {
        for (let i = 0; i < Math.ceil(response["arr"].length/this.perPanel); i++) {
          this.products.push([]);
        }
        for(var i = 0; i < response["arr"].length; i++) {
          var product = response["arr"][i]["product"];
          var price = response["arr"][i]["set_price"];
          var onPromo = response["arr"][i]["on_promo"];
          let j = Math.floor(i/this.perPanel);
          this.products[j].push(
            new Product(product["id"], product["name"], product["image"], product["description"], product["thumbnail"], price, product["set_name"], product["promo_price"], product["promo_discount"], onPromo)
          );
        }
      }
      else {
        for (let i = 0; i < Math.ceil(response["arr"].length/this.perPanel/2); i++) {
          this.products.push([]);
        }
        for(var i = 0; i < response["arr"].length; i++) {
          var product = response["arr"][i]["product"];
          var price = response["arr"][i]["set_price"];
          var onPromo = response["arr"][i]["on_promo"];
          let j = Math.floor(i/this.perPanel/2);
          this.products[j].push(
            new Product(product["id"], product["name"], product["image"], product["description"], product["thumbnail"], price, product["set_name"], product["promo_price"], product["promo_discount"], onPromo)
          );
        }
      }
    }), error => console.log(error), () => console.log("done")}

  ngAfterViewInit() {
    // $('.carousel.carousel-slider').carousel({
    //   fullWidth: true,
    //   indicators: true
    // });
  }

  show(layout) {
    return layout == this.layout;
  }

  initCarousel() {
    if(!this.initFire) {
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });
      this.initFire = true;
      let height = $('.carousel .box')[0].offsetHeight;
      if(this.layout == "stacked") {
        height = height * 2 + 50;
      }
      $('.carousel-item').css("min-height", height)
      $('.carousel-item').css("height", height)
      $('.carousel.carousel-slider').css("height", height + 75)
    }
  }

  setPanels() {
    let width = window.outerWidth;
    if(width < 600) {
      this.layout = "flat";
      this.perPanel = 1;
    }
    else if(width < 992) {
      this.perPanel = 2;
    }
    else if(width < 1800) {
      this.perPanel = 3;
    }
    else {
      this.perPanel = 4;
    }
  }

  setCol() {
    let number = 12/this.perPanel;
    return "col box s" + number;
  }
}
