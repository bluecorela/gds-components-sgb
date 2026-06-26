import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-gds-input-money',
  templateUrl: './gds-input-money.html',
  styleUrl: './gds-input-money.scss',
  standalone: false,
})
export class GdsInputMoney {
  @Input() formController!: FormControl;
  @Input() placeholder: string = '0.00';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showErrors: boolean = true;
  @Input() validations?: Array<{ type: string; message: string }>;

  /** Color del mensaje de error. Default: rojo #c30000 */
  @Input() errorColor: string = '#c30000';

  @Output() valueChange = new EventEmitter<FormControl>();

  onMoneyInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let clean = input.value.replace(/\D/g, '');

    if (!clean || clean === '0' || clean === '00') {
      this.formController.setValue('', { emitEvent: false });
      return;
    }

    // Cap at 9,999,999 (7 integer digits)
    if (parseInt(clean) > 9999999) {
      clean = clean.slice(0, -1);
    }

    const numeric = Number(clean) / 100;
    const formatted = numeric.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    this.formController.setValue(formatted, { emitEvent: false });
    this.valueChange.emit(this.formController);
  }

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
}
