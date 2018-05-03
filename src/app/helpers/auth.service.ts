export class AuthService {

  private jwtName = 'tw_auth';
  private userData = null;
  public userStored = false;

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

}
