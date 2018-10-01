import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Store } from '../store.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [CategoryService, StoreService]
})
export class LandingPageComponent implements OnInit {
  categories: Category[];
  store: Store;
  constructor(private categoryService: CategoryService, private storeService: StoreService) { }

  ngOnInit() {
    this.categories = this.categoryService.parentCategories();

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
    })
  }

}
