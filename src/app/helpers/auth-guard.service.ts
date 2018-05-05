import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

      return this.httpService.isUserAuthenticated()
        .map((data) => {
          if (data.authorized) {
            return true;
          }
          this.router.navigateByUrl('/signin');
          return false;
        }).first();

    }
}
