import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';
import { Promotion } from '../promotion.model';
import { PromotionService } from '../promotion.service';
import { Router } from '@angular/router';
import { showPrices } from '../secrets';

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
  @Input() pageNumber:number;
  @Output() emitSort = new EventEmitter();
  @Output() emitPriceFilter = new EventEmitter();
  @Output() emitPage = new EventEmitter();
  promotions: Promotion[] = [];
  minPrice: number = 0;
  maxPrice: number = 3000;
  pageArray: number[] = [];
  constructor(private promotionService: PromotionService, private router: Router) { }

  ngOnInit() {
    $(function() {
      $('select').formSelect();
    })
    console.log(this.products)
    for(var i = 0; i < this.pages; i ++) {
        this.pageArray.push(i+1)
    }
    this.promotions = this.promotionService.getPromotions();
  }


  sendSort(event) {
    this.emitSort.emit(event.target.value)
  }

  sendPage(number) {
    if(number > 0 && number <= this.pages && number != this.pageNumber) {
      this.emitPage.emit(number);
    }
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

  showPrices() {
    return showPrices;
  }
}
