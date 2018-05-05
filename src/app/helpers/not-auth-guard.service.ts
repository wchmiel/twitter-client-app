import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

      return this.httpService.isUserAuthenticated()
        .map((data) => {
          if (data.authorized) {
            this.router.navigateByUrl('/');
            return false;
          }
          return true;
        }).first();

    }
}
