import { Component, OnInit } from '@angular/core';
import { AuthService } from './helpers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log('Init app component');
    this.authService.saveUserToken();
  }

}
