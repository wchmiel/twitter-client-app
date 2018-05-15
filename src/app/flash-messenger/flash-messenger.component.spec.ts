import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { FlashMessengerComponent } from './flash-messenger.component';
import { FlashMessenger } from './flash-messenger.service';

describe('FlashMessengerComponent', () => {
  let comp: FlashMessengerComponent;
  let fixture: ComponentFixture<FlashMessengerComponent>;
  let flashMessengerStub: Partial<FlashMessenger>;

  beforeEach(() => {
    flashMessengerStub = {
      showMessage() {
        return true;
      },
      showFlashMessage: new Subject<any>()
    };

    TestBed.configureTestingModule({
      declarations: [
        FlashMessengerComponent
      ],
      providers: [
        { provide: FlashMessenger, value: flashMessengerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FlashMessengerComponent);
    comp = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create the FlashMessengerComponent', async(() => {
    expect(comp).toBeTruthy();
  }));


  describe('#showNewMessage', () => {

    let messageToShow = {
      message: 'new info message',
      type: 'info'
    };

    beforeEach(() => {
      comp.showNewMessage(messageToShow);
    });

    it('should set a new message value', () => {
      const elemText = fixture.nativeElement.querySelector('.tw-flash-messenger-cnt span').innerText;
      expect(elemText).toBe(messageToShow.message);
    });

    it('should set proper css classes in messanger container box', () => {
      const flashCntClasses = fixture.nativeElement.querySelector('.tw-flash-messenger-cnt').className.split(' ');
      expect(flashCntClasses).toContain(messageToShow.type);
      expect(flashCntClasses).toContain('show');
    });

  });

});
