import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingToursPage } from './upcoming-tours.page';

describe('UpcomingToursPage', () => {
  let component: UpcomingToursPage;
  let fixture: ComponentFixture<UpcomingToursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingToursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingToursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
