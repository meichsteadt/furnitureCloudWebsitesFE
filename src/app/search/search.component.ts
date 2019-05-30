import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from '../search.service';
import { Product } from '../product.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  products: Product[];
  sortBy: string = "price";
  pages: number;
  pageNumber: number = 1;
  query: String = "";
  minPrice: number = 0;
  maxPrice: number = 3000;
  loaded = false;

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.query = urlParameters['query'];
      this.getProducts();
    })
  }

  getProducts() {
    this.products = []
    this.searchService.getProducts(this.query, this.sortBy, this.minPrice, this.maxPrice, this.pageNumber).subscribe(response => {
      this.pages = response["pages"];
      for(var i = 0; i < response["arr"].length; i++) {
        var product = response["arr"][i]["product"];
        var price = response["arr"][i]["set_price"];
        this.products.push(
          new Product(product["id"], product["name"], product["image"], product["description"], product["thumbnail"], price, product["set_name"], product["promo_price"], response["promo_discount"], response["on_promo"])
        );
      }
    }, err =>{}, () => this.loaded = true);
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

  receivePage(page) {
    this.pageNumber = page;
    this.getProducts();
  }
}
