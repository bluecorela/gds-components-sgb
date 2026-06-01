import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GdsInputComponent } from './gds-input';

describe('GdsInputComponent', () => {
  let component: GdsInputComponent;
  let fixture: ComponentFixture<GdsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GdsInputComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GdsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle value writes', () => {
    component.writeValue('Test Value');
    expect(component.value).toBe('Test Value');
  });

  it('should toggle password visibility', () => {
    component.type = 'password';
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
  });
});
