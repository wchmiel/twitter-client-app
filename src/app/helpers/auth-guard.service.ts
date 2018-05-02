import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
      // return this.httpService.isUserAuthenticated();
      return new Promise((resolve, reject) => {
        // this.httpService.isUserAuthenticated().then(() => {
        //   resolve(true);
        // }).catch(() => {
        //   this.router.navigate(['/signin']);
        //   reject(false);
        // });
        this.httpService.isUserAuthenticated().subscribe(
          (data) => {
            console.log(data);
            resolve(true);
          },
          (error) => {
            console.log(error);
            // this.router.navigate(['/signin']);
            this.router.navigateByUrl('/aaaaaaaaa');
          }
        );
      });
    }
}
