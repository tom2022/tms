import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTourPage } from './current-tour.page';

describe('CurrentTourPage', () => {
  let component: CurrentTourPage;
  let fixture: ComponentFixture<CurrentTourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
