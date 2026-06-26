import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-gds-input-textarea',
  templateUrl: './gds-input-textarea.html',
  styleUrl: './gds-input-textarea.scss',
  standalone: false,
})
export class GdsInputTextarea {
  @Input() formController!: FormControl;
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showErrors: boolean = true;
  @Input() maxLength?: number;
  @Input() rows: number = 5;
  @Input() validations?: Array<{ type: string; message: string }>;

  /** Color del mensaje de error. Default: rojo #c30000 */
  @Input() errorColor: string = '#c30000';

  @Output() valueChange = new EventEmitter<FormControl>();

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
