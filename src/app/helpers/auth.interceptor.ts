import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// INTERCEPTOR WITH TOKEN AND ERROR HANDLER
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (private httpService: HttpService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const token = this.httpService.getToken(); // getting token from localStorage
    const token = 'sdfsdfsF1MRKWMGFK2N41R33RF2';
    let request = null;
    console.log('token: ' + token);

    if (token) {
      request = req.clone({
        headers: req.headers.set('x-auth', token)
      });
      console.log('copiedReq:');
      console.log(request);
    } else {
      request = req;
      console.log('request:');
      console.log(request);
    }
    return next.handle(request).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error || 'Server Error');
  }
}
