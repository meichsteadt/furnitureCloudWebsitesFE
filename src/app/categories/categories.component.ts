import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {
  parentCategory: string;
  categories: Category[];
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.parentCategories();
  }


}
