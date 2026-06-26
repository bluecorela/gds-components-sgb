import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'lib-gds-otp',
  templateUrl: './gds-otp.html',
  styleUrl: './gds-otp.scss',
  standalone: false,
})
export class GdsOtp implements OnChanges {
  /** Número de cajas. Default: 6 */
  @Input() length: number = 6;

  /** Solo números. Default: true */
  @Input() allowNumbersOnly: boolean = true;

  /** Placeholder de cada caja. Default: '-' */
  @Input() placeholder: string = '-';

  /** Deshabilita la edición (para auto-fill del TOKEN) */
  @Input() disabled: boolean = false;

  /** Valor externo para auto-completar (ej. token automático) */
  @Input() value: string = '';

  /** Emite el OTP completo cada vez que cambia alguna caja */
  @Output() otpChange = new EventEmitter<string>();

  @ViewChildren('otpBox') boxes!: QueryList<ElementRef<HTMLInputElement>>;

  digits: string[] = [];

  ngOnInit(): void {
    this.digits = Array(this.length).fill('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['length']) {
      this.digits = Array(this.length).fill('');
    }
    if (changes['value'] && this.value) {
      this.setExternalValue(this.value);
    }
  }

  // ── Evento input ──────────────────────────────────────────────────────────

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let char = input.value;

    if (this.allowNumbersOnly) {
      char = char.replace(/\D/g, '');
    }

    // Tomar solo el último carácter (evita pegar múltiples)
    if (char.length > 1) {
      this.handlePaste(char, index);
      return;
    }

    this.digits[index] = char;
    input.value = char;
    this.emit();

    if (char && index < this.length - 1) {
      this.focusBox(index + 1);
    }
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      if (this.digits[index]) {
        this.digits[index] = '';
        (event.target as HTMLInputElement).value = '';
        this.emit();
      } else if (index > 0) {
        this.digits[index - 1] = '';
        this.focusBox(index - 1);
        this.emit();
      }
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft' && index > 0) this.focusBox(index - 1);
    if (event.key === 'ArrowRight' && index < this.length - 1) this.focusBox(index + 1);
  }

  onFocus(event: FocusEvent): void {
    (event.target as HTMLInputElement).select();
  }

  // ── Paste ─────────────────────────────────────────────────────────────────

  onPaste(event: ClipboardEvent, startIndex: number): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') || '';
    this.handlePaste(text, startIndex);
  }

  private handlePaste(text: string, startIndex: number): void {
    let chars = this.allowNumbersOnly ? text.replace(/\D/g, '') : text;
    chars = chars.slice(0, this.length - startIndex);

    for (let i = 0; i < chars.length; i++) {
      const boxIndex = startIndex + i;
      if (boxIndex < this.length) {
        this.digits[boxIndex] = chars[i];
      }
    }

    this.syncBoxValues();
    this.emit();

    const nextFocus = Math.min(startIndex + chars.length, this.length - 1);
    this.focusBox(nextFocus);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private focusBox(index: number): void {
    setTimeout(() => {
      this.boxes?.toArray()[index]?.nativeElement.focus();
    });
  }

  private syncBoxValues(): void {
    this.boxes?.toArray().forEach((box, i) => {
      box.nativeElement.value = this.digits[i] ?? '';
    });
  }

  private setExternalValue(val: string): void {
    const chars = val.slice(0, this.length).split('');
    this.digits = Array(this.length)
      .fill('')
      .map((_, i) => chars[i] ?? '');
    setTimeout(() => this.syncBoxValues());
  }

  private emit(): void {
    this.otpChange.emit(this.digits.join(''));
  }

  /** Acceso externo para limpiar */
  reset(): void {
    this.digits = Array(this.length).fill('');
    this.syncBoxValues();
    this.emit();
  }

  get boxIndexes(): number[] {
    return Array.from({ length: this.length }, (_, i) => i);
  }
}
