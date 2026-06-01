import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsCalendar } from './gds-calendar';

describe('GdsCalendar', () => {
  let component: GdsCalendar;
  let fixture: ComponentFixture<GdsCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
