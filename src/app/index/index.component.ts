import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  // signinServerErr: Observable<any>;
  // private signinServerErrSub: Subscription;
  @ViewChild('btnSubmitForm') btnSubmitForm: ElementRef;

  constructor(private renderer: Renderer2, private httpService: HttpService) { }

  ngOnInit() {

    // declaration of signin Form
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

  }

  onSubmit() {
    const user = {
      email: this.signinForm.value['email'],
      password: this.signinForm.value['password']
    };

    this.httpService.signin(user);

    // this.store.dispatch(new AuthActions.TrySignin(user));

    // start btn_spinner animation
    // this.renderer.addClass(this.btnSubmitForm.nativeElement, 'sz-btn-is-loading');
  }

  ngOnDestroy() {

  }

}
