import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdsButton } from './gds-button';

describe('GdsButton', () => {
  let component: GdsButton;
  let fixture: ComponentFixture<GdsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GdsButton],
    }).compileComponents();

    fixture = TestBed.createComponent(GdsButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button label', () => {
    component.label = 'Enviar';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.gds-button');
    expect(button.textContent.trim()).toBe('Enviar');
  });

  it('should apply outline variant class', () => {
    component.variant = 'outline';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.gds-button');
    expect(button.classList.contains('gds-button--outline')).toBe(true);
  });

  it('should disable the native button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
