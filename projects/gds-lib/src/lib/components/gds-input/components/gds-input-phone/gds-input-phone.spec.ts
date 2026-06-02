import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsInputPhone } from './gds-input-phone';

describe('GdsInputPhone', () => {
  let component: GdsInputPhone;
  let fixture: ComponentFixture<GdsInputPhone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsInputPhone],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsInputPhone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
