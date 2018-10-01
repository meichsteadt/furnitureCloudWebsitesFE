import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.component.html',
  styleUrls: ['./categories-products.component.scss'],
  providers: [CategoryService]
})
export class CategoriesProductsComponent implements OnInit {
  parentCategory: string;
  categoryName: string;
  products: Product[];
  pages: number;
  sortBy: string = "price";
  minPrice: number = 0;
  maxPrice: number = 3000;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.parentCategory = urlParameters['parentCategory'];
      this.categoryName = urlParameters['categoryName'];

      this.getProducts();
    })
  }

  getProducts() {
    var tempProducts = this.categoryService.getCategoryProducts(this.categoryName, this.parentCategory, this.sortBy, this.minPrice, this.maxPrice);
    this.products = tempProducts["products"];
    this.pages = tempProducts["pages"];
  }

  receiveSort(sortBy) {
    this.sortBy = sortBy;
    this.getProducts();
  }

  receivePriceFilter(event) {
    this.minPrice = event["min"];
    this.maxPrice = event["max"];
    this.getProducts();
  }
}
