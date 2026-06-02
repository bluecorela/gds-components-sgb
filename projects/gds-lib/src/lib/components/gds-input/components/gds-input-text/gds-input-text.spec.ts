import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsInputText } from './gds-input-text';

describe('GdsInputText', () => {
  let component: GdsInputText;
  let fixture: ComponentFixture<GdsInputText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsInputText],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsInputText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
