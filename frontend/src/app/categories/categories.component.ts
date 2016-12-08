import { Component, OnInit } from '@angular/core';
import { CategoriesRestService, Category } from '../categories-rest.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  showForm: boolean = false;
  categories: Category[] = [];

  constructor(private restService: CategoriesRestService) {
    this.restService.getList().subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
  }

  categoryAdded(category: Category) {
    this.categories.unshift(category);
    this.showForm = false;
  }

  formCanceled() {
    this.showForm = false;
  }

}
