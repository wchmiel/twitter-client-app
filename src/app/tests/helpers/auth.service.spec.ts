import { async, TestBed } from '@angular/core/testing';
import { AuthService } from '../../helpers/auth.service';
import { Router } from '@angular/router';
import { userMock } from '../../helpers/user-mock.model';

describe('AuthService', () => {

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const jwtName = 'tw_auth';
  let service: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.get(AuthService);
  });

  describe('#setUserData', () => {

    it('should set user data', () => {
      service.setUserData(userMock);
      expect(service.getUserData()).toEqual(userMock);
    });

  });

  describe('#getJwtFromCookie', () => {

    it('should get json web token from cookie', () => {
      const cookie = 'test_token_hash';
      document.cookie = `x-auth=${cookie}`;
      expect(service.getJwtFromCookie()).toEqual(cookie);
    });

    it('should return false when no x-auth cookie', () => {
      document.cookie = 'x-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      expect(service.getJwtFromCookie()).not.toBeTruthy();
    });

  });

  describe('#saveUserToken', () => {

    beforeEach(() => {
      localStorage.removeItem(jwtName);
    });

    it('should save user token to local storage', () => {
      const token = 'test_token_hash';
      document.cookie = `x-auth=${token}`;
      service.saveUserToken();
      expect(service.getToken()).toEqual(token);
    });

    it('should return false when token does not exist', () => {
      document.cookie = 'x-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      expect(service.saveUserToken()).not.toBeTruthy();
    });

  });

  describe('#removeToken', () => {

    beforeEach(() => {
      localStorage.removeItem(jwtName);
    });

    it('should remove token', () => {
      const token = 'test_token_hash';
      localStorage.setItem(jwtName, token);
      service.removeToken();
      expect(localStorage.getItem(jwtName)).not.toBeTruthy();
    });

  });

});
