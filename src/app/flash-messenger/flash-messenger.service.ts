import { Subject } from 'rxjs/Subject';

export interface FlashMessage {
  message: string;
  type: string; // info, success, error
}

export class FlashMessenger {

  public showFlashMessage = new Subject<FlashMessage>();

  constructor() {}

  public showMessage(message: FlashMessage) {
    this.showFlashMessage.next(message);
  }

}
