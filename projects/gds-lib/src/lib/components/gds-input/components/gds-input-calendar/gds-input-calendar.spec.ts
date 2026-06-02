import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsInputCalendar } from './gds-input-calendar';

describe('GdsInputCalendar', () => {
  let component: GdsInputCalendar;
  let fixture: ComponentFixture<GdsInputCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsInputCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsInputCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
