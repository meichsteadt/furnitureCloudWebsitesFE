import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';
import { AhoyService } from '../ahoy.service';
import { Product } from '../product.model';

declare var $:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartService]
})
export class CartComponent implements OnInit {
  products: Product[];
  cart: Cart;

  constructor(
    private cartService: CartService,
    private ahoy: AhoyService
  ) { }

  ngOnInit() {
    var setCartProducts = (products) => {
      this.products = products;
      $("#cart_item_num").text(products.length);
    }

    var setCart = (cart) => {
      this.cart = cart;
      this.cartService.getCartItems(cart, setCartProducts);
    }

    this.cartService.getCart(setCart);

    $('#cart-slide-out').sidenav({
      edge: 'right',
      menuWidth: '30vw'
    });
  }
}
