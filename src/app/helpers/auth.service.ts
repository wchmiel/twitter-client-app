export class AuthService {

  private jwtName = 'tw_auth';

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

}
