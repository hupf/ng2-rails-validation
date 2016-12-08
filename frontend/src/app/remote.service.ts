import { Injectable } from '@angular/core';
import {
  Http, Headers, RequestOptions, Response,
  RequestOptionsArgs
} from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class RemoteService {
  constructor(protected http: Http) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(url, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, this.addHeaders(options))
      .catch(this.handleError.bind(this)) as Observable<Response>;
  }

  protected handleError(error: any): Observable<any> {
    if (error.status !== 422) {
      // Handle error responses
    }
    return Observable.throw(error);
  }

  protected addHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    if (!options.headers) options.headers = new Headers();
    options.headers.set('Content-Type', 'application/json');
    return options;
  }
}
