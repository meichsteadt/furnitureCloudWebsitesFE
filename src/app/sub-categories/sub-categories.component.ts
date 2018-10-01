import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

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
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.parentCategory = urlParameters['parentCategory'];
      this.categories = this.categoryService.getCategories(this.parentCategory);

      $(function() {
        $('.sidenav').sidenav('close');
      })
    })

  }


}
