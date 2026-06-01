import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsAlert } from './gds-alert';

describe('GdsAlert', () => {
  let component: GdsAlert;
  let fixture: ComponentFixture<GdsAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsAlert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
