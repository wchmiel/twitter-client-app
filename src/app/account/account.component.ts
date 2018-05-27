import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../helpers/http.service';
import { AuthService } from '../helpers/auth.service';
import { FlashMessenger, FlashMessage } from '../global-components/flash-messenger/flash-messenger.service';
import { userMock } from '../helpers/user-mock.model';
import { ModalService, ModalConfig, ModalInfo } from '../global-components/modal/modal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('spinner') spinner: ElementRef;
  @ViewChild('container') container: ElementRef;
  // @ViewChild('modalBg') modalBg: ElementRef;
  // @ViewChild('modalCnt') modalCnt: ElementRef;
  // @ViewChild('textarea') textarea: ElementRef;

  // public tweetBtnDisabled = true;
  public userData;
  private modalSubscription: Subscription;

  constructor(private router: Router,
    private renderer: Renderer2,
    private modalService: ModalService,
    private flashMessenger: FlashMessenger,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.oauth_verifier) {
      this.router.navigate(['']);
    }

    // this.userData = new Promise((resolve, reject) => {
    //   this.hideSpinner();
    //   this.showContent();
    //   resolve(userMock);
    // });

    if (this.authService.userStored) {
      this.userData = new Promise((resolve, reject) => {
        const data = this.authService.getUserData;
        this.hideSpinner();
        this.showContent();
        resolve(data);
      });
    } else {
      this.userData = new Promise((resolve, reject) => {
        this.httpService.getUserData().subscribe((data) => {
          this.authService.setUserData(data);
          this.hideSpinner();
          this.showContent();
          resolve(data);
        });
      });
    }
  }

  private hideSpinner() {
    this.renderer.addClass(this.spinner.nativeElement, 'hide');
  }

  private showContent() {
    this.renderer.addClass(this.container.nativeElement, 'ready');
  }

  public logout() {
    this.confirmLogout();
    this.setModalSubscription((info: ModalInfo) => {
      if (info.confirm) {
        this.authService.logout();
      }
    });
  }

  private confirmLogout() {
    this.modalService.open({
      content: {
        info: true,
        infoContent: 'Do you really want to logout?',
        textarea: false
      },
      headerCaption: 'Confirm logout',
      confirmBtnCaption: 'Logout'
    });
  }

  public onOpenTweetModal() {
    this.openAddTweetModal();
    this.setModalSubscription((info: ModalInfo) => {
      if (info.confirm) {
        this.addTweet(info.info);
      }
    });
  }

  private openAddTweetModal() {
    this.modalService.open({
      content: {
        info: false,
        textarea: true,
        textareaPlaceholder: 'What\'s up?'
      },
      headerCaption: 'Add a new tweet!',
      confirmBtnCaption: 'Add tweet'
    });
  }

  private setModalSubscription(callback) {
    this.modalSubscription = this.modalService.afterClose.subscribe((info: ModalInfo) => {
      callback(info);
      this.deleteModalSubscription();
    });
  }

  private deleteModalSubscription() {
    this.modalSubscription.unsubscribe();
  }

  // public onHideModal() {
  //   // service modal
  //   // this.toggleModal('close');
  //   // this.textarea.nativeElement.value = '';
  //   // this.tweetBtnDisabled = true;
  // }

  public addTweet(text: string) {
    if (text !== '') {
      this.showMessage({
        message: 'Tweet sent to Twitter.',
        type: 'info-message'
      });
      const textJson = JSON.stringify({status: text});
      this.httpService.addTweet(textJson).subscribe((res) => {

        if (res.authorized !== undefined && !res.authorized) {
          this.logout();
          this.showMessage({
            message: 'You are unauthorized.',
            type: 'error-message'
          });
        } else {
          this.httpService.getUserData().subscribe((data) => {
            this.authService.setUserData(data);
            this.userData = new Promise((resolve, reject) => {
              resolve(data);
            });
          });

          this.showMessage({
            message: 'Tweet added successfully.',
            type: 'success-message'
          });
        }

      });
    }
  }

  private showMessage(message: FlashMessage) {
    this.flashMessenger.showMessage(message);
  }

  // public toggleModal(action: string) {
  //   if (action === 'open') {
  //     this.renderer.addClass(this.modalCnt.nativeElement, 'open');
  //     this.renderer.addClass(this.modalBg.nativeElement, 'open');
  //   } else {
  //     this.renderer.removeClass(this.modalCnt.nativeElement, 'open');
  //     this.renderer.removeClass(this.modalBg.nativeElement, 'open');
  //   }
  // }

  // public onChangeTextarea() {
  //   const value = this.textarea.nativeElement.value;
  //   if (value) {
  //     this.tweetBtnDisabled = false;
  //   } else {
  //     this.tweetBtnDisabled = true;
  //   }
  // }

}
