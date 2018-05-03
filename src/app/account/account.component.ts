import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../helpers/http.service';
import { AuthService } from '../helpers/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user;
  public userMock = {
    followers: {
      users: [
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/378800000341208645/30ed0453138f0bffa3e7de986556c3c2.jpeg',
          name: 'Michał Chmiel',
          screen_name: 'mochollllll'
        },
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/992105692214513664/7TvaKnwn.jpg',
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
          profile_image_url: 'http://pbs.twimg.com/profile_images/556495456805453826/wKEOCDN0.png',
          name: 'Andrzej Duda',
          screen_name: 'dudaaaaaaaa111'
        },
        {
          profile_image_url: 'http://pbs.twimg.com/profile_images/990605878993793024/7uuCR4hP.jpg',
          name: 'Donald Tusk',
          screen_name: 'tusekk999'
        }
      ]
    },
    tweets: [
      {
        created_at: 'Wed May 02 06:28:00 +0000 2018',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non dolor gravida, viverra risus in, vehicula mauris. Donec egestas non ex vel ultricies. Vestibulum vestibulum vulputate velit id sodales. Ut quis turpis at magna consectetur scelerisque non ut metus. Sed sollicitudin libero massa, ut tincidunt ante vulputate sit amet.'
      },
      {
        created_at: 'Wed May 02 06:22:57 +0000 2018',
        text: 'Vivamus malesuada ante at sapien aliquet, in cursus neque tincidunt. Mauris vel sem consectetur, dictum lectus et, ultrices nisi. Suspendisse quis elit sed velit feugiat vestibulum vitae a lorem.'
      },
      {
        created_at: 'Sat Apr 28 07:58:17 +0000 2018',
        text: 'Maecenas mollis quam non dictum efficitur. Proin augue mi, sagittis a arcu eu, laoreet feugiat diam. Ut urna sem, bibendum quis orci sed, laoreet blandit dui.'
      },
      {
        created_at: 'Wed Apr 25 17:46:43 +0000 2018',
        text: 'Sed pulvinar, est vel congue mollis, mi enim fermentum orci, in hendrerit massa leo et metus.'
      }
    ],
    user: {
      name: 'Wojciech Chmiel',
      screen_name: 'Wojo_Chmiel',
      profile_image_url: 'http://pbs.twimg.com/profile_images/992105692214513664/7TvaKnwn.jpg',
    }
  };

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.oauth_verifier) {
      this.router.navigate(['']);
    }

    if (this.authService.userStored) {
      this.user = this.authService.getUserData;
      console.log('user data from service!');
    } else {
      this.httpService.getUserData().subscribe((user) => {
        this.user = user;
        this.authService.setUserData(user);

        console.log('$$$$$$$$$$$$$');
        console.log(this.user);
        console.log('$$$$$$$$$$$$$');
      });
      console.log('user data from server!');
    }
  }

}
