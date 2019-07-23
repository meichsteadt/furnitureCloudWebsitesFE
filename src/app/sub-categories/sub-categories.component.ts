import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CategoryService } from '../category.service';
import { AhoyService } from '../ahoy.service';
import { Category } from '../category.model';
import { AuthService } from '../auth.service';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
  providers: [CategoryService]
})
export class SubCategoriesComponent implements OnInit {
  parentCategory: string;
  categories: Category[] = [];
  edit = this.auth.authToken;
  
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private ahoy: AhoyService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.ahoy.trackView();

    this.route.params.subscribe((urlParameters) => {

      this.parentCategory = urlParameters['parentCategory'];
      this.categories = this.categoryService.getCategories(this.parentCategory);

      $(function() {
        $('.sidenav').sidenav('close');
      })
    })

  }

  goToRoute(parentCategory, category) {
    "/categories/{{parentCategory}}/{{category.linkName()}}{{category.set()}}"
    this.router.navigateByUrl("/categories/" + parentCategory + "/" + encodeURIComponent(category.linkName()))
  }


}
