import { Component, OnInit } from '@angular/core';
import { Promotion } from '../promotion.model';
import { Product } from '../product.model';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  providers: [PromotionService]
})
export class PromotionsComponent implements OnInit {
  promotions: Promotion[] = [];

  constructor(private promotionService: PromotionService) { }

  ngOnInit() {
    this.promotions = this.promotionService.getPromotions();
  }

}
