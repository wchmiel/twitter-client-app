/*jshint esversion: 6 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';

const appRoutes: Routes = [
  // { path: '', canActivate: [NotAuthGuard], component: HomeComponent },
  { path: '', component: IndexComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
  // providers: [
  //   NotAuthGuard
  // ]
})

export class AppRoutingModule {}
