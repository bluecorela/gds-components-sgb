import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsFooter } from './gds-footer';

describe('GdsFooter', () => {
  let component: GdsFooter;
  let fixture: ComponentFixture<GdsFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
