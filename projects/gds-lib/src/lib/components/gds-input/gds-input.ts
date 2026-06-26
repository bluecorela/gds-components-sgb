import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export type GdsInputType = 'text' | 'money' | 'phone' | 'textarea';

@Component({
  selector: 'lib-gds-input',
  templateUrl: './gds-input.html',
  styleUrl: './gds-input.scss',
  standalone: false,
})
export class GdsInput {
  // ── Tipo ─────────────────────────────────────────────────────────────────
  @Input() type: GdsInputType = 'text';

  // ── Comunes ───────────────────────────────────────────────────────────────
  @Input() formController!: FormControl | FormGroup;
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showErrors: boolean = true;
  @Input() validations?: Array<{ type: string; message: string }>;
  @Input() errorColor: string = '#c30000';

  // ── Text ─────────────────────────────────────────────────────────────────
  @Input() inputId: string = '';
  @Input() readonly: boolean = false;
  @Input() optional: boolean = false;
  @Input() textPattern?: RegExp;
  @Input() maxLength?: number;

  // ── Phone ─────────────────────────────────────────────────────────────────
  @Input() prefixPhone: boolean = false;
  @Input() prefixValue: string = '';
  @Input() countryCode: string = '';

  // ── Textarea ──────────────────────────────────────────────────────────────
  @Input() rows: number = 5;

  // ── Output unificado ─────────────────────────────────────────────────────
  @Output() valueChange = new EventEmitter<any>();

  // ── Helpers de tipo ──────────────────────────────────────────────────────
  get asFormControl(): FormControl {
    return this.formController as FormControl;
  }
}
