import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private jwtName = 'tw_auth';
  private userData = null;
  public userStored = false;

  constructor(private router: Router) {}

  public setUserData(user) {
    this.userData = user;
    this.userStored = true;
  }

  public getUserData() {
    return this.userData;
  }

  public saveUserToken() {
    const cookie_jwt = this.getJwtFromCookie();
    if (cookie_jwt) {
      localStorage.setItem(this.jwtName, cookie_jwt);
    }
  }

  public getJwtFromCookie() {
    const jwt_cookie = document.cookie.match(new RegExp('x-auth=([^;]+)'));
    if (jwt_cookie) {
      return jwt_cookie[1];
    }
    return false;
  }

  public getToken() {
    return localStorage.getItem(this.jwtName);
  }

  public removeToken() {
    try {
      localStorage.removeItem(this.jwtName);
      return true;
    } catch (e) {
      return false;
    }
  }

  public logout() {
    const removeToken = this.removeToken();
    if (removeToken) {
      this.router.navigate(['/signin']);
    } else {
      return false;
    }
  }

}
