import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourOverviewPage } from './tour-overview.page';

describe('TourOverviewPage', () => {
  let component: TourOverviewPage;
  let fixture: ComponentFixture<TourOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
