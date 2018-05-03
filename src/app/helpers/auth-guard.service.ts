import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
      // return this.httpService.isUserAuthenticated();
      // return new Promise((resolve, reject) => {
      //   // this.httpService.isUserAuthenticated().then(() => {
      //   //   resolve(true);
      //   // }).catch(() => {
      //   //   this.router.navigate(['/signin']);
      //   //   reject(false);
      //   // });
      //   this.httpService.isUserAuthenticated().subscribe(
      //     (data) => {
      //       console.log(data);
      //       resolve(true);
      //     },
      //     (error) => {
      //       console.log(error);
      //       reject(false);
      //       // this.router.navigate(['/signin']);
      //       this.router.navigateByUrl('/aaaaaaaaa');
      //     }
      //   );
      // });
      return this.httpService.getUserData()
        .map((data) => {
          if (data.authorized) {
            console.log(data);
            console.log('authenticated 2');
            return true;
          }
          console.log('not authenticated 2');
          this.router.navigateByUrl('/signin');
          return false;
        }).first();
      // return this.httpService.isUserAuthenticated()
      //   .map(
      //     (data) => {
      //       console.log('------------------------');
      //       console.log(data);
      //       console.log('authenticated 2');
      //       console.log('------------------------');
      //       return true;
      //     },
      //     (error) => {
      //       this.router.navigateByUrl('/signin');
      //       console.log('------------------------');
      //       console.log(error);
      //       console.log('not authenticated 2');
      //       console.log('------------------------');
      //       return false;
      //     }
      //   ).first();
      // const self = this;
      // return new Promise((resolve, reject) => {
      //   this.httpService.isUserAuthenticated().subscribe(
      //         (data) => {
      //           console.log('------------------------');
      //           console.log(data);
      //           console.log('authenticated 2');
      //           console.log('------------------------');
      //           // return true;
      //           resolve(true);
      //         },
      //         (error) => {
      //           self.router.navigate(['/signin']);
      //           console.log('------------------------');
      //           console.log(error);
      //           console.log('not authenticated 2');
      //           console.log('------------------------');
      //           // reject(false);
      //         }
      //   );
      // });
    }
}
