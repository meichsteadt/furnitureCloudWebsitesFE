import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { PromotionService } from '../promotion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotions-products',
  templateUrl: './promotions-products.component.html',
  styleUrls: ['./promotions-products.component.scss'],
  providers: [PromotionService]
})
export class PromotionsProductsComponent implements OnInit {
  id: string;
  sortBy: string = "price";
  products: Product[] = [];
  pages: number;
  pageNumber: number = 1;
  minPrice: number = 0;
  maxPrice: number = 3000;
  loaded = false;
  constructor(private route: ActivatedRoute, private promotionService: PromotionService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.id = urlParameters['id'];
      this.getProducts();
    })
  }

  getProducts() {
    this.products = [];
    this.promotionService.getPromotionProducts(this.id, this.pageNumber, this.sortBy, this.minPrice, this.maxPrice).subscribe(response => {
      for(var i = 0; i < response["arr"].length; i++) {
        var product = response["arr"][i]["product"];
        var price = response["arr"][i]["set_price"];
        var onPromo = response["arr"][i]["on_promo"];
        this.pages = response["pages"];
        this.products.push(
          new Product(product["id"], product["name"], product["image"], product["description"], product["thumbnail"], price, product["set_name"], product["promo_price"], product["promo_discount"], onPromo)
        );
      }
    }, err =>{}, () => this.loaded = true);
  }

  receiveSort(sortBy) {
    this.sortBy = sortBy;
    this.getProducts();
  }

  receivePage(page) {
    this.pageNumber = page;
    this.getProducts();
  }

  receivePriceFilter(event) {
    this.minPrice = event["min"];
    this.maxPrice = event["max"];
    this.getProducts();
  }

}
