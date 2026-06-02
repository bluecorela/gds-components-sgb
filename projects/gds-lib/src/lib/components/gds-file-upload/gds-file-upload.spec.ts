import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsFileUpload } from './gds-file-upload';

describe('GdsFileUpload', () => {
  let component: GdsFileUpload;
  let fixture: ComponentFixture<GdsFileUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsFileUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsFileUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
