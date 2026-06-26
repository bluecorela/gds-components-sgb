import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { merge, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-gds-input-phone',
  templateUrl: './gds-input-phone.html',
  styleUrl: './gds-input-phone.scss',
  standalone: false,
})
export class GdsInputPhone implements OnInit, OnChanges {
  /**
   * FormControl para el número de teléfono, o FormGroup con
   * `{ prefix: FormControl, number: FormControl }` cuando `prefixPhone=true`.
   */
  @Input() formController!: FormControl | FormGroup;

  /** Texto placeholder del campo de número */
  @Input() placeholder: string = '';

  /** Etiqueta superior */
  @Input() title: string = '';

  /** Texto informativo debajo del campo */
  @Input() subtitle: string = '';

  /** Mostrar mensajes de error */
  @Input() showErrors: boolean = true;

  /** Máximo de caracteres del campo numérico */
  @Input() maxLength?: number;

  /** Reglas de validación [{ type, message }] */
  @Input() validations?: Array<{ type: string; message: string }>;

  /**
   * Muestra un campo de código de área editable antes del número.
   * Si `formController` es un FormGroup con `prefix` + `number`, los usa directamente.
   * Si es un FormControl simple, se usa un control interno para el prefijo.
   */
  @Input() prefixPhone: boolean = false;

  /**
   * Sincroniza el valor del código de área cuando se controla externamente
   * (solo aplica cuando `prefixPhone=true` y `formController` es FormControl).
   */
  @Input() prefixValue: string = '';

  /**
   * Código de país estático que se muestra como etiqueta antes del número,
   * ej. "(+507)". No genera un campo editable — solo es visual.
   * Se muestra únicamente cuando el campo tiene valor.
   */
  @Input() countryCode: string = '';

  /** Color del mensaje de error. Default: rojo #c30000 */
  @Input() errorColor: string = '#c30000';

  @Output() valueChange = new EventEmitter<{
    phoneNumber: string;
    areaCode: string;
  }>();

  /** Control interno para el prefijo cuando formController es un FormControl simple */
  readonly internalPrefixControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('^[0-9]*$'),
  ]);

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.syncPrefixValue();

    if (this.prefixPhone) {
      merge(
        this.formController.valueChanges,
        this.prefixControl.valueChanges
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.emitValue());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prefixValue']) {
      this.syncPrefixValue();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Control accessors ──────────────────────────────────────────────────────

  get prefixControl(): FormControl {
    if (this.formController instanceof FormGroup) {
      return this.formController.get('prefix') as FormControl;
    }
    return this.internalPrefixControl;
  }

  get numberControl(): FormControl {
    if (this.formController instanceof FormGroup) {
      return this.formController.get('number') as FormControl;
    }
    return this.formController as FormControl;
  }

  // ── Display helpers ────────────────────────────────────────────────────────

  get showCountryCodeLabel(): boolean {
    return !!this.countryCode && !!this.numberControl?.value;
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  validateError(): boolean {
    return !!(this.formController?.touched && this.formController?.invalid);
  }

  get errorMessage(): string | null {
    if (!this.formController?.touched || !this.validations) return null;
    for (const v of this.validations) {
      if (this.formController.hasError(v.type)) return v.message;
    }
    return null;
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private syncPrefixValue(): void {
    if (!this.prefixPhone || this.formController instanceof FormGroup) return;
    const next = String(this.prefixValue || '').trim();
    if (this.internalPrefixControl.value !== next) {
      this.internalPrefixControl.setValue(next, { emitEvent: false });
    }
  }

  private emitValue(): void {
    this.valueChange.emit({
      phoneNumber: this.numberControl?.value || '',
      areaCode: this.prefixPhone ? this.prefixControl?.value || '' : '',
    });
  }
}
