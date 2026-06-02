import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsModal } from './gds-modal';

describe('GdsModal', () => {
  let component: GdsModal;
  let fixture: ComponentFixture<GdsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
