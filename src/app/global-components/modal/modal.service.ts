import { Subject } from 'rxjs/Subject';

export interface ModalInfo {
  confirm: boolean;
  info?: string;
}

export interface ModalConfig {
  content: {
    info: boolean; // default false
    infoContent?: string;
    textarea: boolean; // default false
    textareaPlaceholder?: string;
  };
  headerCaption?: string;
  cancelBtnCaption?: string; // default cancel
  confirmBtnCaption?: string; // default confirm
  showConfirmBtn?: boolean; // default true
}

export class ModalService {

  public afterClose = new Subject<ModalInfo>();
  public showModal = new Subject<ModalConfig>();

  public open(modalConfig: ModalConfig) {
    this.showModal.next(modalConfig);
  }

  public onClose(modalInfo: ModalInfo) {
    this.afterClose.next(modalInfo);
  }

}
