import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { GdsRadiobutton } from './gds-radiobutton';

describe('GdsRadiobutton', () => {
  let component: GdsRadiobutton;
  let fixture: ComponentFixture<GdsRadiobutton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [GdsRadiobutton],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsRadiobutton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
