import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotHandoverPage } from './depot-handover.page';

describe('DepotHandoverPage', () => {
  let component: DepotHandoverPage;
  let fixture: ComponentFixture<DepotHandoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepotHandoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotHandoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
