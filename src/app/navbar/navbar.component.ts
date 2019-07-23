import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { PromotionService } from '../promotion.service';
import { Promotion } from '../promotion.model';
import { Store } from '../store.model';
import { StoreAuthService } from '../store-auth.service';
import { AhoyService } from '../ahoy.service';
import { showPromotions } from '../secrets';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [CategoryService, PromotionService]
})
export class NavbarComponent implements OnInit {
  categories: Category[];
  promotions: Promotion[];
  store = this.storeService.store;
  showTop: Boolean = true;
  constructor(private categoryService: CategoryService, private promotionService: PromotionService, private storeService: StoreAuthService, private ahoy: AhoyService, private router: Router) { }

  ngOnInit() {
    this.categories = this.categoryService.parentCategories();
    this.promotions = this.promotionService.getPromotions();

    $(function() {
      var width = (window.innerWidth - ($('.brand-logo')[0].offsetWidth * 1.5)) * .75;
      $('.dropdown-content').css("min-width", width + "px");
      $('.dropdown-content').css("max-width", width + "px");
      $(".dropdown-trigger").dropdown({coverTrigger: false, constrainWidth: false});
    })


  }

  showPromotions() {
    return this.showPromotions
  }

  hideTop() {
    if(this.router.url.match(/products/)) {
      this.showTop = false;
    }

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(this.router.url.match(/products/)) {
          this.showTop = false;
        }
        else {
          this.showTop = true;
        }
      }
    })
  }
}
