import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  public signin(userData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const res = this.http.get<any>('/twitter/login', {headers: headers});
  }

  public isUserAuthenticated() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>('/check/authentication', {headers: headers});
  }

  public getUserData() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>('/user/show', {headers: headers});
  }

  public addTweet(status) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>('/add/tweet', status , {headers: headers});
  }

}
