import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourGuidedPage } from './tour-guided.page';

describe('TourGuidedPage', () => {
  let component: TourGuidedPage;
  let fixture: ComponentFixture<TourGuidedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourGuidedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourGuidedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
