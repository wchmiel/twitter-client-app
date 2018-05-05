import { ErrorHandler, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FlashMessenger, FlashMessage } from '../flash-messenger/flash-messenger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private flashMessenger: FlashMessenger) {}

  handleError(err) {
    console.log('----------- mam errora----------');
    console.log(err);
    console.log('----------- mam errora----------');
    this.flashMessenger.showMessage({
      message: err.error.errors[0].message,
      type: 'error-message'
    });
  }

}
