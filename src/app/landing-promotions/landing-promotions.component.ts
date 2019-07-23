import { Component, OnInit } from '@angular/core';
import { Promotion } from '../promotion.model';
import { Product } from '../product.model';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-landing-promotions',
  templateUrl: './landing-promotions.component.html',
  styleUrls: ['./landing-promotions.component.scss'],
  providers: [PromotionService]
})
export class LandingPromotionsComponent implements OnInit {
  promotions: Promotion[] = [];

  constructor(private promotionService: PromotionService) { }

  ngOnInit() {
    this.promotions = this.promotionService.getPromotions();
  }

}
