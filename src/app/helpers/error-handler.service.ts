import { ErrorHandler, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FlashMessenger, FlashMessage } from '../global-components/flash-messenger/flash-messenger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private flashMessenger: FlashMessenger) {}

  handleError(err) {
    if (err.error !== undefined) {
      this.flashMessenger.showMessage({
        message: err.error.errors[0].message,
        type: 'error-message'
      });
    } else {
      console.log(err);
      throw Error;
    }
  }

}
