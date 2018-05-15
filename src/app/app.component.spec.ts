import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './helpers/auth.service';

@Component({selector: 'app-flash-messenger', template: ''})
class FlashMessengerStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }


describe('AppComponent', () => {

  let authServiceStub: Partial<AuthService>;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {

    authServiceStub = {
      saveUserToken() {
        return true;
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FlashMessengerStubComponent,
        RouterOutletStubComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;

  }));

  it('should create the AppComponent', async(() => {
    expect(comp).toBeTruthy();
  }));

  it('should invoke saveUserToken method from authService on init', () => {
    expect(comp.ngOnInit).toBeTruthy();
  });

});
