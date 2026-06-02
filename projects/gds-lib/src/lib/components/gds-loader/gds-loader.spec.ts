import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsLoader } from './gds-loader';

describe('GdsLoader', () => {
  let component: GdsLoader;
  let fixture: ComponentFixture<GdsLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
