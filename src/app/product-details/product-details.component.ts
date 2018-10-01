import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductItem } from '../product-item.model';

declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  product: Product;
  productItems: ProductItem[] = [];
  relatedProducts: Product[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.productId = urlParameters['id'];

      this.productService.getProduct(this.productId).subscribe(response => {
        var product = response["product"];
        var price = response["set_price"];
        this.product = new Product(
          product["id"],
          product["name"],
          product["image"],
          product["description"],
          product["thumbnail"],
          price,
          product["set_name"]
        );
      });

      this.productService.getProductItems(this.productId).subscribe((response: Array<any>) => {
        this.productItems = [];
        for(var i = 0; i < response.length; i++) {
          var productItem = response[i]["product_item"];
          var price = response[i]["price"];
          this.productItems.push(new ProductItem (
            productItem["name"],
            productItem["dimensions"],
            price
          ))
        }
      });

      this.productService.getRelatedProducts(this.productId).subscribe((response: Array<any>) => {
        this.relatedProducts = [];
        for(var i = 0; i < response.length; i++) {
          var product = response[i];
          this.relatedProducts.push(new Product(
            product["id"],
            product["name"],
            product["image"],
            product["description"],
            product["thumbnail"],
            product["price"],
            product["set_name"]
          ))
        }
      })

      $(document).ready(function(){
        $('.materialboxed').materialbox();
        $('.collapsible').collapsible({accordion: false});
        $('.collapsible').collapsible('open');
        $('html,body').scrollTop(0);
      });
    })
  }

}
