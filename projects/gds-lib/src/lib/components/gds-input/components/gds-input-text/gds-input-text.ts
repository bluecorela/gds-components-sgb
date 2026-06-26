import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-gds-input-text',
  templateUrl: './gds-input-text.html',
  styleUrl: './gds-input-text.scss',
  standalone: false,
})
export class GdsInputText {
  @Input() formController!: FormControl;
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showErrors: boolean = true;
  @Input() inputId: string = '';
  @Input() readonly: boolean = false;
  @Input() optional: boolean = false;
  @Input() textPattern?: RegExp;
  @Input() maxLength?: number;
  @Input() validations?: Array<{ type: string; message: string }>;

  /** Color del mensaje de error. Default: rojo #c30000 */
  @Input() errorColor: string = '#c30000';

  @Output() valueChange = new EventEmitter<FormControl>();

  onTextInput(event: Event): void {
    if (!this.textPattern) return;
    const input = event.target as HTMLInputElement;
    const filtered = input.value
      .split('')
      .filter((char) => this.textPattern!.test(char))
      .join('');
    if (input.value !== filtered) {
      input.value = filtered;
      this.formController.setValue(filtered, { emitEvent: false });
    }
  }

  onChange(): void {
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
