import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

export interface GdsBulletItem {
  label: string;
  valid: boolean;
}

@Component({
  selector: 'lib-gds-bullets',
  templateUrl: './gds-bullets.html',
  styleUrl: './gds-bullets.scss',
  standalone: false,
})
export class GdsBullets {
  /** Lista de ítems a mostrar como bullets */
  @Input() items: GdsBulletItem[] = [];

  constructor(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry) {
    matIconRegistry
      .addSvgIcon(
        'bullet',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/bullet.svg')
      )
      .addSvgIcon(
        'gray-bullet',
        domSanitizer.bypassSecurityTrustResourceUrl('assets/gray-bullet.svg')
      );
  }
}
