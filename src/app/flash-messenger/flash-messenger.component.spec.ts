import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessengerComponent } from './flash-messenger.component';

describe('FlashMessengerComponent', () => {
  let component: FlashMessengerComponent;
  let fixture: ComponentFixture<FlashMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
