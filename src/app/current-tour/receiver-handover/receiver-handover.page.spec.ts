import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverHandoverPage } from './receiver-handover.page';

describe('ReceiverHandoverPage', () => {
  let component: ReceiverHandoverPage;
  let fixture: ComponentFixture<ReceiverHandoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverHandoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverHandoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
