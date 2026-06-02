import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsSelect } from './gds-select';

describe('GdsSelect', () => {
  let component: GdsSelect;
  let fixture: ComponentFixture<GdsSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
