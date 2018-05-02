import { Component, OnInit } from '@angular/core';
import { HttpService } from './helpers/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    console.log('ok');
    // this.httpService.testHttp();
  }

}
