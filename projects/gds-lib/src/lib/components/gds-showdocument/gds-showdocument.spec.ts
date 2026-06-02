import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsShowdocument } from './gds-showdocument';

describe('GdsShowdocument', () => {
  let component: GdsShowdocument;
  let fixture: ComponentFixture<GdsShowdocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsShowdocument],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsShowdocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
