import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../helpers/http.service';
import { AuthService } from '../helpers/auth.service';
import { FlashMessenger, FlashMessage } from '../flash-messenger/flash-messenger.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('spinner') spinner: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('modalBg') modalBg: ElementRef;
  @ViewChild('modalCnt') modalCnt: ElementRef;
  @ViewChild('textarea') textarea: ElementRef;

  public tweetBtnDisabled = true;
  public userData;
  // public userData = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     this.hideSpinner();
  //     this.showContent();
  //     resolve(this.userMock);
  //   }, 200);
  // });

  constructor(private router: Router,
    private renderer: Renderer2,
    private flashMessenger: FlashMessenger,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.oauth_verifier) {
      this.router.navigate(['']);
    }

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
    this.authService.logout();
  }

  public onOpenTweetModal() {
    this.toggleModal('open');
  }

  public onHideModal() {
    this.toggleModal('close');
    this.textarea.nativeElement.value = '';
    this.tweetBtnDisabled = true;
  }

  public onAddTweet() {
    const text = this.textarea.nativeElement.value;
    if (text !== '') {
      this.onHideModal();
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

  public toggleModal(action: string) {
    if (action === 'open') {
      this.renderer.addClass(this.modalCnt.nativeElement, 'open');
      this.renderer.addClass(this.modalBg.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.modalCnt.nativeElement, 'open');
      this.renderer.removeClass(this.modalBg.nativeElement, 'open');
    }
  }

  public onChangeTextarea() {
    const value = this.textarea.nativeElement.value;
    if (value) {
      this.tweetBtnDisabled = false;
    } else {
      this.tweetBtnDisabled = true;
    }
  }

}
