import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  public signin(userData) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const res = this.http.get<any>('http://localhost:3000/login', {headers: headers});
    res.subscribe(data => {
      console.log(data);
    });
  }

}
