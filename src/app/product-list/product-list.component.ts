import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';
import { Promotion } from '../promotion.model';
import { PromotionService } from '../promotion.service';
import { AuthService } from '../auth.service';
import { AhoyService } from '../ahoy.service';
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
  @Input() sortBy:String;
  @Output() emitSort = new EventEmitter();
  @Output() emitPriceFilter = new EventEmitter();
  @Output() emitPage = new EventEmitter();
  promotions: Promotion[] = [];
  minPrice: number = 0;
  maxPrice: number = 5000;
  pageArray: number[] = [];
  edit: boolean = this.auth.authToken ? true : false
  constructor(private promotionService: PromotionService, private router: Router, private ahoy: AhoyService, private auth: AuthService) { }

  ngOnInit() {
    this.ahoy.trackView();
    $(function() {
      $('select').formSelect();
    })

    for(var i = 0; i < this.pages; i ++) {
        this.pageArray.push(i+1)
    }
    this.promotions = this.promotionService.getPromotions();
  }


  sendSort(event) {
    this.emitSort.emit(event.target.value)
  }

  sendPage(number) {
    this.ahoy.trackUniq("$view", {page: window.location.pathname, pageNumber: number  })
    if(number > 0 && number <= this.pages && number != this.pageNumber) {
      this.emitPage.emit(number);
    }
  }

  sendPrices(event, minMax) {
    if(minMax === "min") {
      this.ahoy.trackUniq("$submit", {class: 'min-price', price: event.target.value})
      this.minPrice = parseInt(event.target.value);
    }
    else {
      this.ahoy.trackUniq("$submit", {class: 'max-price', price: event.target.value})
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
