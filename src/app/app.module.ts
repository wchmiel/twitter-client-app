import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';

import { AppComponent } from './app.component';

import { GlobalErrorHandler } from './helpers/error-handler.service';
import { HttpService } from './helpers/http.service';
import { AuthService } from './helpers/auth.service';
import { ModalService } from './global-components/modal/modal.service';
import { FlashMessenger } from './global-components/flash-messenger/flash-messenger.service';
import { AccountComponent } from './account/account.component';
import { SigninComponent } from './signin/signin.component';
import { FlashMessengerComponent } from './global-components/flash-messenger/flash-messenger.component';
import { ModalComponent } from './global-components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    SigninComponent,
    FlashMessengerComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MomentModule,
    AppRoutingModule, // the main routing module
    NgbModule.forRoot()
  ],
  providers: [
    HttpService,
    AuthService,
    FlashMessenger,
    ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
