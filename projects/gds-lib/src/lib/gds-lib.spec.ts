import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsLib } from './gds-lib';

describe('GdsLib', () => {
  let component: GdsLib;
  let fixture: ComponentFixture<GdsLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsLib],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
