import { Component, OnInit, Output } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Store } from '../store.model';
import { StoreAuthService } from '../store-auth.service';
import { AuthService } from '../auth.service';
import { EditService } from '../edit.service';
import { showPromotions } from '../secrets';

declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [CategoryService]
})
export class LandingPageComponent implements OnInit {
  categories: Category[];
  store = this.storeService.store;
  model;
  modelType: string;
  edit = this.auth.authToken;

  constructor(private categoryService: CategoryService, private storeService: StoreAuthService, private auth: AuthService, public editService: EditService) { }

  ngOnInit() {
    this.categories = this.categoryService.parentCategories();
  }

  editCategory(category) {
    $('#edit-category').sidenav('open');
    this.modelType = "Category";
    this.model = category;
  }

  showPromotions() {
    return this.showPromotions;
  }

}
