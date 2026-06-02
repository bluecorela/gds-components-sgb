import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsInputSearch } from './gds-input-search';

describe('GdsInputSearch', () => {
  let component: GdsInputSearch;
  let fixture: ComponentFixture<GdsInputSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsInputSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsInputSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
