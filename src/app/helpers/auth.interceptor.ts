import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// INTERCEPTOR WITH TOKEN AND ERROR HANDLER
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (private httpService: HttpService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken(); // getting token from cookie
    let request = null;
    // console.log('------------------------');
    // console.log('token: ' + token);
    // console.log('------------------------');

    if (token) {
      request = req.clone({
        headers: req.headers.set('x-auth', token)
      });
      // console.log('copiedReq:');
      // console.log(request);
    } else {
      request = req;
      // console.log('request:');
      // console.log(request);
    }
    return next.handle(request)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    console.log('##########################');
    console.log(error);
    console.log('##########################');
    return Observable.throw(error || 'Server Error');
  }

  private handleResponse(res) {
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log(res);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    return res;
  }
}
