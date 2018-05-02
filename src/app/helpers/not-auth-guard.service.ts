import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
      return new Promise((resolve, reject) => {
        this.httpService.isUserAuthenticated().subscribe(
          (data) => {
            console.log(data);
            // this.router.navigate(['/aaaaaaaaa']);
            this.router.navigateByUrl('/aaaaaaaaa');
          },
          (error) => {
            console.log(error);
            resolve(true);
          }
        );
      });
    }
}
