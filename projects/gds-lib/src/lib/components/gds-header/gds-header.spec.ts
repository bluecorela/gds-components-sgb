import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsHeader } from './gds-header';

describe('GdsHeader', () => {
  let component: GdsHeader;
  let fixture: ComponentFixture<GdsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
