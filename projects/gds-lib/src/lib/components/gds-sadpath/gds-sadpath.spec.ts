import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsSadpath } from './gds-sadpath';

describe('GdsSadpath', () => {
  let component: GdsSadpath;
  let fixture: ComponentFixture<GdsSadpath>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsSadpath],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsSadpath);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
