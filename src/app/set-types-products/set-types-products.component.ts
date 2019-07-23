import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SetTypeService } from '../set-type.service';
import { Category } from '../category.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-set-types-products',
  templateUrl: './set-types-products.component.html',
  styleUrls: ['./set-types-products.component.scss'],
  providers: [SetTypeService]
})
export class SetTypesProductsComponent implements OnInit {
  parentCategory: string;
  categoryName: string;
  setTypeName: string;
  products: Product[] = [];
  pages: number;
  pageNumber: number = 1;
  sortBy: string = "price";
  minPrice: number = 0;
  maxPrice: number = 3000;
  loaded = false;
  constructor(private route: ActivatedRoute, private setTypeService: SetTypeService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.parentCategory = urlParameters['parentCategory'];
      this.categoryName = urlParameters['categoryName'];
      this.setTypeName = urlParameters['setTypeName'];

      this.getProducts();
    })
  }

  getProducts() {
    this.products = [];
    this.setTypeService.getSetProducts(this.setTypeName, this.categoryName, this.parentCategory, this.sortBy, this.minPrice, this.maxPrice, this.pageNumber).subscribe((response: Array<any>) => {
      this.pages = response["pages"];
      for(var i = 0; i < response["arr"].length; i++) {
        var product = response["arr"][i]["product"];
        var price = response["arr"][i]["set_price"];
        var onPromo = response["arr"][i]["on_promo"];
        this.products.push(
          new Product(product["id"], product["name"], product["image"], product["description"], product["thumbnail"], price, product["set_name"], product["promo_price"], product["promo_discount"], onPromo)
        );
      }
    }, err =>{}, () => this.loaded = true);
  }

  receiveSort(sortBy) {
    this.pageNumber = 1;
    this.sortBy = sortBy;
    this.getProducts();
  }

  receivePriceFilter(event) {
    this.minPrice = event["min"];
    this.maxPrice = event["max"];
    this.getProducts();
  }

  receivePage(page) {
    this.pageNumber = page;
    this.getProducts();
  }
}
