import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor() {}

  handleError(error) {
    console.log('----------- mam errora----------');
    console.log(error);
    console.log('----------- mam errora----------');
  }

}
