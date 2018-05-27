import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalService, ModalConfig, ModalInfo } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('modalBg') modalBg: ElementRef;
  @ViewChild('modalCnt') modalCnt: ElementRef;
  @ViewChild('textarea') textarea: ElementRef;
  public confirmBtnDisabled = false;
  private textareaValue = '';
  private modalConfig = null;
  protected defaultModalConfig = {
    content: {
      info: false,
      infoContent: '',
      textarea: false,
      textareaPlaceholder: ''
    },
    headerCaption: '',
    cancelBtnCaption: 'Cancel',
    confirmBtnCaption: 'Confirm',
    showConfirmBtn: true
  };

  constructor(private renderer: Renderer2, private modalService: ModalService) {
    this.modalConfig = this.defaultModalConfig;
  }

  ngOnInit() {
    this.modalService.showModal.subscribe((config: ModalConfig) => {
      this.setModalConfig(config);
      this.setConfirmBtn();
      this.showModal();
    });
  }

  public getModalConfig() {
    return this.modalConfig;
  }

  public onCancel() {
    this.modalService.onClose({confirm: false});
    this.hideModal();
  }

  public onConfirm() {
    this.modalService.onClose({
      confirm: true,
      info: this.textareaValue
    });
    this.hideModal();
  }

  private setModalConfig(config: ModalConfig) {
    this.modalConfig = {
      ...this.defaultModalConfig,
      ...config
    };
  }

  private setConfirmBtn() {
    if (this.modalConfig.content.textarea) {
      this.confirmBtnDisabled = true;
    }
  }

  private showModal() {
    this.toggleModal('open');
  }

  private hideModal() {
    this.modalConfig = this.defaultModalConfig;
    this.toggleModal('close');
    if (this.modalConfig.textarea) {
      this.textarea.nativeElement.value = '';
      this.textareaValue = '';
    }
  }

  private toggleModal(action: string) {
    if (action === 'open') {
      this.renderer.addClass(this.modalCnt.nativeElement, 'open');
      this.renderer.addClass(this.modalBg.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.modalCnt.nativeElement, 'open');
      this.renderer.removeClass(this.modalBg.nativeElement, 'open');
    }
  }

  private onChangeTextarea() {
    const value = this.textarea.nativeElement.value;
    if (value) {
      this.textareaValue = value;
      this.confirmBtnDisabled = false;
    } else {
      this.textareaValue = '';
      this.confirmBtnDisabled = true;
    }
  }

}
