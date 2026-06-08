import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-gds-calendar',
  templateUrl: './gds-calendar.html',
  styleUrl: './gds-calendar.scss',
  standalone: false,
})
export class GdsCalendar {
  @Input() formController!: FormControl;
  @Input() title: string = 'Fecha de ingreso';
  public isOpen: boolean = false;

  constructor(
    domSanitizer: DomSanitizer,
    matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry
      .addSvgIcon('calendario', domSanitizer.bypassSecurityTrustResourceUrl(`assets/calendario.svg`))
  }

  public getDate(event: any): void {
    const day = String(event.getDate()).padStart(2, '0');
    const month = String(event.getMonth() + 1).padStart(2, '0'); 
    const year = event.getFullYear();
    this.formController.setValue(`${day}/${month}/${year}`);
    this.cancel();
  }

  public cancel(): void {
    this.isOpen && (this.isOpen = false);
  }
}