import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { AppComponent } from './app.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories/categories.component';
import { RemoteService } from './remote.service';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { FieldErrorsComponent } from './form-errors/field-errors.component';
import { CategoriesRestService } from './categories-rest.service';

@NgModule({
  declarations: [
    AppComponent,
    FormErrorsComponent,
    FieldErrorsComponent,
    CategoriesComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  providers: [
    RemoteService,
    CategoriesRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
