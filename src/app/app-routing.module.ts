/*jshint esversion: 6 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth-guard.service';
import { NotAuthGuard } from './helpers/not-auth-guard.service';
import { SigninComponent } from './signin/signin.component';
import { AccountComponent } from './account/account.component';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], component: AccountComponent },
  { path: 'signin', canActivate: [NotAuthGuard], component: SigninComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    NotAuthGuard
  ]
})

export class AppRoutingModule {}
