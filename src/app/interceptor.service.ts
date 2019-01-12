import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('themoviedb')) {
      const duplicate = req.clone({params: req.params.set('api_key', environment.apiKey)});
      return next.handle(duplicate);
    }

    if (req.url.includes('http://localhost:3000')) {
      const headers = req.headers
        .set('Content-Type', 'application/json; charset=UTF-8');
      return next.handle(req.clone({headers}));

    }
    return next.handle(req);
  }

}
