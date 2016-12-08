import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RemoteService } from './remote.service';

export interface Category {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class CategoriesRestService {
  baseUrl: string = '/api/categories';
  rootKey: string = 'category';
  rootKeyPlural: string = 'categories';

  constructor(private remote: RemoteService) {}

  getList(): Observable<Category[]> {
    return this.remote.get(this.baseUrl)
      .map(res => res.json()[this.rootKeyPlural]) as Observable<Category[]>;
  }

  create(category: Category): Observable<Category> {
    return this.remote.post(this.baseUrl, this.rootedJson(category))
      .map(res => res.json()[this.rootKey]) as Observable<Category>;
  }

  private rootedJson(category: Category): string {
    let data = {};
    data[this.rootKey] = category;
    return JSON.stringify(data, (key, value) => value === undefined ? null : value);
  }
}
