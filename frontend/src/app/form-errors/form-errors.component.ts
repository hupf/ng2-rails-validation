import { Component, OnInit, Input } from '@angular/core';
import { FormError } from '../category-form/category-form.component';

@Component({
  selector: 'app-form-errors',
  template: `
  <div *ngFor="let e of errors" class="notification is-danger">
    {{'errors.messages.' + e.error | translate:e.params}}
  </div>
  `
})
export class FormErrorsComponent implements OnInit {

  @Input() errors: FormError[];

  constructor() {}

  ngOnInit() {
  }

}
