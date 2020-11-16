import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';
import { AhoyService } from '../ahoy.service';
import { Product } from '../product.model';

declare var $:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Product[];
  cart: Cart;
  _cartService: CartService;
  constructor(
    private ahoy: AhoyService,
    cartService: CartService
  ) {
    this._cartService = cartService;
    this._cartService.cartProducts.subscribe(products => {
      this.products = products;
      $("#cart_item_num").text(products.length);
    });
  }

  ngOnInit() {
    this.getCartProducts();

    $('#cart-slide-out').sidenav({
      edge: 'right',
      menuWidth: '30vw'
    });
  }

  getCartProducts() {
    this.products = [];
    this._cartService.getCartItems();
  }
}
