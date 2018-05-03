import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('open!');
    // window.open('http:127.0.0.1:3000/twitter/login');
  }

}
