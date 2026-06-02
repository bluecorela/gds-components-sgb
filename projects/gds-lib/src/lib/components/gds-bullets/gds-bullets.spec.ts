import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsBullets } from './gds-bullets';

describe('GdsBullets', () => {
  let component: GdsBullets;
  let fixture: ComponentFixture<GdsBullets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsBullets],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsBullets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
