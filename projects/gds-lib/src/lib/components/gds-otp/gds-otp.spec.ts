import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsOtp } from './gds-otp';

describe('GdsOtp', () => {
  let component: GdsOtp;
  let fixture: ComponentFixture<GdsOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsOtp],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsOtp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
