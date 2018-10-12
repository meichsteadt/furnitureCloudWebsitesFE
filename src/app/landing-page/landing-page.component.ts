import { Component, OnInit, Output } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Store } from '../store.model';
import { StoreService } from '../store.service';
import { EditService } from '../edit.service';

declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [CategoryService, StoreService, EditService]
})
export class LandingPageComponent implements OnInit {
  categories: Category[];
  store: Store;
  constructor(private categoryService: CategoryService, private storeService: StoreService, public editService: EditService) { }

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

  edit(category) {
    $("#main").addClass("edit");
    $("#slideout").addClass("edit");
    this.editService.setModel(category);
  }

}
