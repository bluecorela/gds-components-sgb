import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsInputMoney } from './gds-input-money';

describe('GdsInputMoney', () => {
  let component: GdsInputMoney;
  let fixture: ComponentFixture<GdsInputMoney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsInputMoney],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsInputMoney);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
