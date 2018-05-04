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
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>('http://127.0.0.1:3000/check/authentication', {headers: headers});
  }

  public getUserData() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>('http://127.0.0.1:3000/user/show', {headers: headers});
  }

  public addTweet(text: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>('http://127.0.0.1:3000/add/tweet', text , {headers: headers});
  }

}
