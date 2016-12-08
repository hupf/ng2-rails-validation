import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CategoriesRestService, Category } from '../categories-rest.service';

export interface FormError {
  error: string;
  params: any;
}

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {

  @Output() added: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  submitted: boolean = false;
  invalidControls: string[];

  constructor(private restService: CategoriesRestService, fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      description: ['']
    });
  }

  ngOnInit() {
    this.form.statusChanges.subscribe(() => setTimeout(this.formStatusChanged.bind(this)));
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.restService.create(this.form.value).subscribe(
        entry => this.handleSubmitSuccess(entry),
        error => this.handleSubmitError(error)
      );
    }
  }

  formErrors(): FormError[] {
    if (this.submitted && this.form.errors) {
      return this.getErrors(this.form);
    }
  }

  fieldErrors(name: string): FormError[] {
    let control = this.findFieldControl(name);
    if (control && (control.touched || this.submitted) && control.errors) {
      return this.getErrors(control);
    } else {
      return undefined;
    }
  }

  resetFieldErrors(name: string): void {
    this.form.get(name).setErrors(null);
  }

  protected handleSubmitSuccess(category: Category) {
    this.added.emit(category)
  }

  protected handleSubmitError(error: any) {
    if (error.status === 422) {
      const data = error.json();
      const fields = Object.keys(data || {});
      fields.forEach((field) => {
        const control = this.findFieldControl(field);
        const errors = this.fetchFieldErrors(data, field);
        control.setErrors(errors);
      });
    }
  }

  protected getErrors(control: AbstractControl): FormError[] {
    return Object.keys(control.errors)
      .filter((error) => control.errors[error])
      .map((error) => {
        let params = control.errors[error];
        return {
          error: error,
          params: params === true || params == {} ? null : params
        };
      });
  }

  protected findFieldControl(field: string): AbstractControl {
    let control: AbstractControl;
    if (field === 'base') {
      control = this.form;
    } else if (this.form.contains(field)) {
      control = this.form.get(field);
    } else if (field.match(/_id$/) && this.form.contains(field.substring(0, field.length - 3))) {
      control = this.form.get(field.substring(0, field.length - 3));
    } else if (field.indexOf('.') > 0) {
      let group = this.form;
      field.split('.').forEach((f) => {
        if (group.contains(f)) {
          control = group.get(f);
          if (control instanceof FormGroup) group = control;
        } else {
          control = group;
        }
      })
    } else {
      // Field is not defined in form but there is a validation error for it, set it globally
      control = this.form;
    }
    return control;
  }

  private fetchFieldErrors(data: any, field: string): any {
    const errors = {};
    data[field].forEach((e) => {
      let name: string = e.error;
      delete e.error;
      errors[name] = e;
    });
    return errors;
  }

  protected formStatusChanged(status: string) {
    if (status === undefined) {
      return;
    }
    const hash: { [name: string]: AbstractControl } = {};
    this.getFlatControls(hash, this.form, '')
    this.invalidControls = Object.keys(hash).filter(c => !!hash[c].errors);
  }

  protected getFlatControls(hash: { [name: string]: AbstractControl }, group: FormGroup, prefix: string) {
    for (let name in group.controls) {
      const control = group.get(name);
      if (control instanceof FormGroup) {
        this.getFlatControls(hash, control, prefix + name + '.');
      } else {
        hash[prefix + name] = control;
      }
    }
  }

}
