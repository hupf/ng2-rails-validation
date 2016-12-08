import { Component, OnInit, Input } from '@angular/core';
import { FormError } from '../category-form/category-form.component';

@Component({
  selector: 'app-field-errors',
  template: `
  <span *ngFor="let e of errors" class="help is-danger">
    {{'errors.messages.' + e.error | translate:e.params}}
  </span>
  `
})
export class FieldErrorsComponent implements OnInit {

  @Input() errors: FormError[];

  constructor() {}

  ngOnInit() {
  }

}
