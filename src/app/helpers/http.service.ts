import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  public signin(userData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const res = this.http.get<any>('http://127.0.0.1:3000/twitter/login', {headers: headers});
    res.subscribe(data => {
      console.log(data);
    });
  }

  public isUserAuthenticated() {
    // return new Promise<boolean>((resolve, reject) => {
    //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //   this.http.get<any>('http://127.0.0.1:3000/test', {headers: headers}).subscribe((data) => {
    //     if (data) {
    //       console.log(data);
    //       resolve(true);
    //     } else {
    //       console.log(data);
    //       reject(false);
    //     }
    //   }).catch();
    // });
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>('http://127.0.0.1:3000/test', {headers: headers});
      // .catch((error: HttpErrorResponse) => {
      //   return Observable.throw(error.message || 'Server Error');
      // });
  }

}
