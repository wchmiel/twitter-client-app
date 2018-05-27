import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: Partial<ModalService>;
  const testModalCongif = {
    content: {
      info: true,
      textarea: false
    },
    headerCaption: 'Header test caption'
  };

  beforeEach(() => {
    modalService = {
      showModal: new Subject<testModalCongif>(),
      open() {
        this.showModal.next(testModalCongif);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers: [
        { provide: ModalService, useValue: modalService }
      ]
    });

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the ModalComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('#showModal from ModalService subscription', () => {

    it('should save modal config when open method called in modal service.', () => {
      component.ngOnInit();
      modalService.open();
      expect(component.getModalConfig).toEqual({
        ...component.defaultModalConfig,
        ...testModalCongif
      });
    });

  });


});
