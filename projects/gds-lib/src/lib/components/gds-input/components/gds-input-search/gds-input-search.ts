import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-gds-input-search',
  templateUrl: './gds-input-search.html',
  styleUrl: './gds-input-search.scss',
  standalone: false,
})
export class GdsInputSearch implements OnInit, OnChanges, OnDestroy {
  /** Texto de placeholder del campo de búsqueda */
  @Input() placeholder: string = 'Buscar';

  /** Valor actual del campo (control externo opcional) */
  @Input() value: string = '';

  /** Muestra u oculta el botón de micrófono */
  @Input() showVoice: boolean = true;

  /** Emite el término de búsqueda cada vez que el usuario escribe */
  @Output() searchChange = new EventEmitter<string>();

  /** Emite cuando el usuario limpia el campo */
  @Output() cleared = new EventEmitter<void>();

  /** Emite cuando el input recibe foco (útil para reabrir panel de autocomplete) */
  @Output() focused = new EventEmitter<void>();

  currentValue: string = '';
  isListening: boolean = false;

  private recognition: any;

  constructor(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry) {
    matIconRegistry
      .addSvgIcon('lupa', domSanitizer.bypassSecurityTrustResourceUrl('assets/Interaccion_buscar.svg'))
      .addSvgIcon('lupa_verde', domSanitizer.bypassSecurityTrustResourceUrl('assets/Interaccion_buscar_verde.svg'))
      .addSvgIcon('microfono', domSanitizer.bypassSecurityTrustResourceUrl('assets/Accion_microfono.svg'))
      .addSvgIcon('microfono_verde', domSanitizer.bypassSecurityTrustResourceUrl('assets/Accion_microfono_verde.svg'))
      .addSvgIcon('cerrar', domSanitizer.bypassSecurityTrustResourceUrl('assets/Interaccion_cerrar_envolvente.svg'));
  }

  ngOnInit(): void {
    this.currentValue = this.value ?? '';
    this.initVoiceRecognition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.currentValue = changes['value'].currentValue ?? '';
    }
  }

  ngOnDestroy(): void {
    try {
      this.recognition?.abort();
    } catch {}
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitized = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    if (input.value !== sanitized) {
      input.value = sanitized;
    }

    this.currentValue = sanitized;
    this.searchChange.emit(sanitized);
  }

  clear(): void {
    this.currentValue = '';
    this.searchChange.emit('');
    this.cleared.emit();
  }

  onFocus(): void {
    this.focused.emit();
  }

  async startVoiceSearch(): Promise<void> {
    if (!this.recognition) return;

    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  private initVoiceRecognition(): void {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;

    this.recognition = new SpeechRecognitionAPI();
    this.recognition.lang = 'es-ES';
    this.recognition.interimResults = false;
    this.recognition.continuous = false;

    this.recognition.onstart = () => (this.isListening = true);
    this.recognition.onend = () => (this.isListening = false);
    this.recognition.onerror = () => (this.isListening = false);

    this.recognition.onresult = (event: any) => {
      const transcript: string = event.results[0][0].transcript;
      this.currentValue = transcript;
      this.searchChange.emit(transcript);
    };
  }
}
