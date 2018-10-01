import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';
import { Promotion } from '../promotion.model';
import { PromotionService } from '../promotion.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [PromotionService]
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Input() pages:number;
  @Output() emitSort = new EventEmitter();
  @Output() emitPriceFilter = new EventEmitter();
  promotions: Promotion[] = [];
  minPrice: number = 0;
  maxPrice: number = 3000;
  constructor(private promotionService: PromotionService, private router: Router) { }

  ngOnInit() {
    $(function() {
      $('select').formSelect();
    })
    this.promotions = this.promotionService.getPromotions();
  }


  sendSort(event) {
    this.emitSort.emit(event.target.value)
  }

  sendPrices(event, minMax) {
    if(minMax === "min") {
      this.minPrice = parseInt(event.target.value);
    }
    else {
      this.maxPrice = parseInt(event.target.value);
    }
    this.emitPriceFilter.emit({min: this.minPrice, max: this.maxPrice})
  }

  filterPromotions(event) {
    this.router.navigateByUrl('/promotions/' + event.target.value)
  }

}
