import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../helpers/http.service';
import { AuthService } from '../helpers/auth.service';

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

  public user2;
  public userData;
  // public userData = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     this.hideSpinner();
  //     this.showContent();
  //     resolve(this.userMock);
  //   }, 200);
  // });
  public userMock = {
    followers: {
      users: [
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/378800000341208645/30ed0453138f0bffa3e7de986556c3c2_normal.jpeg',
          name: 'Michał Chmiel',
          screen_name: 'mochollllll'
        },
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/992105692214513664/7TvaKnwn_normal.jpg',
          name: 'Wojciech Chmiel',
          screen_name: 'wojoooooo'
        }
      ]
    },
    friends: {
      users: [
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/992105692214513664/7TvaKnwn.jpg',
          name: 'Wojciech Chmiel',
          screen_name: 'wojoooooo'
        },
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/990605878993793024/7uuCR4hP.jpg',
          name: 'Donald Tusk',
          screen_name: 'tusekk999'
        },
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/556495456805453826/wKEOCDN0.png',
          name: 'Andrzej Duda',
          screen_name: 'dudaaaaaaaa111'
        }
      ]
    },
    tweets: [
      {
        created_at: 'Wed May 02 06:28:00 +0000 2018',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non dolor gravida, viverra risus in, vehicula mauris. Donec egestas non ex vel ultricies.',
        user: {
          profile_image_url: 'http://pbs.twimg.com/profile_images/992105692214513664/7TvaKnwn_normal.jpg',
          name: 'Wojciech Chmiel',
          screen_name: 'wojoooooo'
        }
      },
      {
        created_at: 'Wed May 02 06:22:57 +0000 2018',
        text: 'Vivamus malesuada ante at sapien aliquet, in cursus neque tincidunt. Mauris vel sem consectetur, dictum lectus et, ultrices nisi. Suspendisse quis elit sed velit feugiat vestibulum vitae a lorem.',
        user: {
          profile_image_url: 'http://pbs.twimg.com/profile_images/990605878993793024/7uuCR4hP.jpg',
          name: 'Donald Tusk',
          screen_name: 'tusekk999'
        }
      },
      {
        created_at: 'Sat Apr 28 07:58:17 +0000 2018',
        text: 'Maecenas mollis quam non dictum efficitur. Proin augue mi, sagittis a arcu eu, laoreet feugiat diam. Ut urna sem, bibendum quis orci sed, laoreet blandit dui.',
        user: {
          profile_image_url: 'http://pbs.twimg.com/profile_images/556495456805453826/wKEOCDN0.png',
          name: 'Andrzej Duda',
          screen_name: 'dudaaaaaaaa111'
        }
      },
      {
        created_at: 'Wed Apr 25 17:46:43 +0000 2018',
        text: 'Sed pulvinar, est vel congue mollis, mi enim fermentum orci, in hendrerit massa leo et metus.',
        user: {
          profile_image_url: 'http://pbs.twimg.com/profile_images/556495456805453826/wKEOCDN0.png',
          name: 'Andrzej Duda',
          screen_name: 'dudaaaaaaaa111'
        }
      }
    ],
    user: {
      name: 'Wojciech Chmiel',
      screen_name: 'Wojo_Chmiel',
      profile_image_url: 'http://pbs.twimg.com/profile_images/992105692214513664/7TvaKnwn.jpg',
    }
  };

  constructor(private router: Router,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.oauth_verifier) {
      this.router.navigate(['']);
    }

    if (this.authService.userStored) {
      console.log('user data from service!');
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
          console.log('$$$$$$$$$$$$$');
          console.log(data);
          console.log('$$$$$$$$$$$$$');
          console.log('user data from server!');
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
  }

  public onAddTweet() {
    const text = this.textarea.nativeElement.value;
    console.log(text);
    this.httpService.addTweet(text).subscribe((res) => {
      console.log(res);
    });
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

}
