import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FlashMessenger, FlashMessage } from './flash-messenger.service';

@Component({
  selector: 'app-flash-messenger',
  templateUrl: './flash-messenger.component.html',
  styleUrls: ['./flash-messenger.component.scss']
})
export class FlashMessengerComponent implements OnInit {

  @ViewChild('flashCnt') flashCnt: ElementRef;
  @ViewChild('message') message: ElementRef;
  public messageOnScreen = false;
  public messageAnimationPending = false;
  public messageToShow: FlashMessage;
  private animationDirection = 'up'; // up or down
  private animationEnd = 'animationend';
  private animationStart = 'animationstart';
  private messangerTimeout = null;
  private reopenMessanger = false;

  constructor(private flashMessenger: FlashMessenger, private renderer: Renderer2) { }

  ngOnInit() {
    this.setAnimationStartType();
    this.setAnimationEndType();
    this.setAnimationListeners();

    this.flashMessenger.showFlashMessage.subscribe((value: FlashMessage) => {

      if (value.message !== '' && value.type !== '') {
        this.messageToShow = value;
        this.onShowNewMessage();
      }

    });
  }

  private onShowNewMessage() {
    if (this.messageOnScreen) {
      this.reopenMessanger = true;
      this.clearMessangerTimeout();
      this.hideMessanger();
    } else {
      this.reopenMessanger = false;
      this.showMessanger();
    }
  }

  private showMessanger() {
    this.message.nativeElement.textContent = this.messageToShow.message;
    this.renderer.addClass(this.flashCnt.nativeElement, this.messageToShow.type);
    this.renderer.removeClass(this.flashCnt.nativeElement, 'hide');
    this.renderer.addClass(this.flashCnt.nativeElement, 'show');
    this.messangerTimeout = setTimeout(this.hideMessanger.bind(this), 3000);
  }

  private hideMessanger() {
    this.renderer.removeClass(this.flashCnt.nativeElement, 'show');
    this.renderer.addClass(this.flashCnt.nativeElement, 'hide');
    // another classes will be removed when animation down trigger is invoked
  }

  private clearMessangerTimeout() {
    clearTimeout(this.messangerTimeout);
  }

  private setAnimationEndType() {
    this.animationEnd = (function(el) {
       const animations = {
         animation: 'animationend',
         OAnimation: 'oAnimationEnd',
         MozAnimation: 'mozAnimationEnd',
         WebkitAnimation: 'webkitAnimationEnd',
         MsAnimation: 'MSAnimationEnd'
       };

       for (const i in animations) {
         if (el.style[i] !== undefined) {
           return animations[i];
         }
       }
     })(this.flashCnt.nativeElement);
  }

  private setAnimationStartType() {
    this.animationStart = (function(el) {
       const animations = {
         animation: 'animationstart',
         OAnimation: 'oanimationstart',
         MozAnimation: 'mozAnimationStart',
         WebkitAnimation: 'webkitAnimationStart',
         MsAnimation: 'MSAnimationStart'
       };

       for (const i in animations) {
         if (el.style[i] !== undefined) {
           return animations[i];
         }
       }
     })(this.flashCnt.nativeElement);
  }

  private setAnimationListeners() {
    this.flashCnt.nativeElement.addEventListener(this.animationStart, () => {
      this.messageAnimationPending = true;
      if (this.animationDirection === 'up') {
        this.messageOnScreen = true;
      }
    });

    this.flashCnt.nativeElement.addEventListener(this.animationEnd, () => {

      this.messageAnimationPending = false;

      if (this.animationDirection === 'down') {

        this.messageOnScreen = false;
        const flashCntClassList = Array.from(this.flashCnt.nativeElement.classList);
        flashCntClassList.forEach((elClass) => {
          if (elClass !== 'tw-flash-messenger-cnt') {
            this.renderer.removeClass(this.flashCnt.nativeElement, elClass.toString());
          }
        });
        if (this.reopenMessanger) {
          this.onShowNewMessage();
        }

      }

      this.animationDirection = (this.animationDirection === 'up') ? 'down' : 'up';

    });
  }


}
