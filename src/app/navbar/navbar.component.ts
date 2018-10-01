import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { PromotionService } from '../promotion.service';
import { Promotion } from '../promotion.model';
import { Store } from '../store.model';
import { StoreService } from '../store.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [CategoryService, PromotionService, StoreService]
})
export class NavbarComponent implements OnInit {
  categories: Category[];
  promotions: Promotion[];
  store: Store;
  constructor(private categoryService: CategoryService, private promotionService: PromotionService, private storeService: StoreService) { }

  ngOnInit() {
    this.categories = this.categoryService.parentCategories();
    this.promotions = this.promotionService.getPromotions();

    this.storeService.getStore().subscribe(response => {
      this.store = new Store(
        response["name"],
        response["address"],
        response["city"],
        response["state"],
        response["zip"],
        response["phone"],
        response["email"],
        response["hours"],
        response["google_maps"]
      )
    }, error => console.log(error), () => {
      $(function() {
        var width = window.innerWidth - ($('.brand-logo')[0].offsetWidth * 1.5);
        $('.dropdown-content').css("max-width", width + "px");
        $(".dropdown-trigger").dropdown({coverTrigger: false, constrainWidth: false});
      })
    })


  }

}
