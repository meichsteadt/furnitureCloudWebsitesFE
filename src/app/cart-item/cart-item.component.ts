import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../cart.service';
declare var $:any;


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})

export class CartItemComponent implements OnInit {
  @Input() product: Product;
  quantityArray: number[] = [...Array(10).keys()].slice(1); //This creates an array from 1 to 9;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  updateQuantity(quantity) {
    this.cartService.updateQuantity(this.product.id, quantity);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product.id);
  }

}
