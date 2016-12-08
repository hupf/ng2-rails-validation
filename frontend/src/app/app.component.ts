import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <header class="header">
      <h1 class="title is-1">{{ 'app.title' | translate }}</h1>
    </header>
    <app-categories></app-categories>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

}
