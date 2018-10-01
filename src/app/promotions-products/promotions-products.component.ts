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
  products: Product[];
  pages: number;
  minPrice: number = 0;
  maxPrice: number = 3000;
  pageNumber: number = 1;
  constructor(private route: ActivatedRoute, private promotionService: PromotionService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.id = urlParameters['id'];
      this.getProducts();
    })
  }

  getProducts() {
    this.products = this.promotionService.getPromotionProducts(this.id, this.pageNumber, this.sortBy, this.minPrice, this.maxPrice);
  }

  receiveSort(sortBy) {
    this.sortBy = sortBy;
    this.getProducts();
  }

  nextPage(page) {
    this.getProducts();
  }

  receivePriceFilter(event) {
    this.minPrice = event["min"];
    this.maxPrice = event["max"];
    this.getProducts();
  }

}
