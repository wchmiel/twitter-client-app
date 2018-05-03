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
      // return new Promise((resolve, reject) => {
      //   this.httpService.isUserAuthenticated().subscribe(
      //     (data) => {
      //       console.log(data);
      //       reject(false);
      //       // this.router.navigate(['/aaaaaaaaa']);
      //       this.router.navigateByUrl('/aaaaaaaaa');
      //     },
      //     (error) => {
      //       console.log(error);
      //       resolve(true);
      //     }
      //   );
      // });
      return this.httpService.isUserAuthenticated()
        .map((data) => {
          if (data.authorized) {
            console.log(data);
            console.log('authenticated 1');
            this.router.navigateByUrl('/');
            return false;
          }
          console.log('not authenticated 1');
          return true;
        }).first();
      // return this.httpService.isUserAuthenticated()
      //   .map(
      //     (data) => {
      //       this.router.navigateByUrl('/');
      //       console.log('------------------------');
      //       console.log(data);
      //       console.log('authenticated 1');
      //       console.log('------------------------');
      //       return false;
      //     },
      //     (error) => {
      //       console.log('------------------------');
      //       console.log(error);
      //       console.log('not authenticated 1');
      //       console.log('------------------------');
      //       return true;
      //     }
      //   ).first();
      // const self = this;
      // return new Promise((resolve, reject) => {
      //   this.httpService.isUserAuthenticated().subscribe(
      //         (data) => {
      //           self.router.navigate(['/']);
      //           console.log('------------------------');
      //           console.log(data);
      //           console.log('authenticated 1');
      //           console.log('------------------------');
      //           // return false;
      //           // reject(false);
      //         },
      //         (error) => {
      //           console.log('------------------------');
      //           console.log(error);
      //           console.log('not authenticated 1');
      //           console.log('------------------------');
      //           // return true;
      //           resolve(true);
      //         }
      //   );
      // });
    }
}
