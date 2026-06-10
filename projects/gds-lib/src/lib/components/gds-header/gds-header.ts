import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

type TypeHeader = 'NORMAL' | 'STEPPER' | 'NUMBERS';
@Component({
  selector: 'lib-gds-header',
  templateUrl: './gds-header.html',
  styleUrl: './gds-header.scss',
  standalone: false
})
export class GdsHeader {
  @Input() type: TypeHeader = 'NORMAL';
  @Input() steppers: string[] = [];
  @Output() back = new EventEmitter<boolean>();
  @Output() exit = new EventEmitter<boolean>();
  @ViewChild('stepper') set stepperContainer(element: ElementRef<HTMLDivElement> | undefined) {
    if (element) {
      console.log('STEPPER');
    }
  }
  @ViewChild('number') set numberContainer(element: ElementRef<HTMLDivElement> | undefined) {
    if (element) {
      console.log('number');
    }
  }

  constructor(
    domSanitizer: DomSanitizer,
    matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry
      .addSvgIcon('cerrar', domSanitizer.bypassSecurityTrustResourceUrl(`assets/cerrar.svg`))
      .addSvgIcon('atras', domSanitizer.bypassSecurityTrustResourceUrl(`assets/atras.svg`))
      .addSvgIcon('logo-sgb', domSanitizer.bypassSecurityTrustResourceUrl(`assets/logo-sgb.svg`));
  }

  public onBack(): void {
    this.back.emit();
  }

  public onExit(): void {
    this.exit.emit();
  }

}