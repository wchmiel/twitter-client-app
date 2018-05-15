import { async, TestBed } from '@angular/core/testing';
import { AuthService } from '../../helpers/auth.service';
import { Router } from '@angular/router';
import { userMock } from '../../helpers/user-mock.model';

describe('AuthService', () => {

  let service: AuthService;
  // let user: userMock;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthService
      ]
    });

    service = TestBed.get(AuthService);
  });

  describe('#setUserData', () => {

    // it('should set user data', () => {
    //   service.setUserData(userMock);
    //   expect(service.getUserData()).toEqual(userMock);
    // });

  });

});
