import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-gds-footer',
  templateUrl: './gds-footer.html',
  styleUrl: './gds-footer.scss',
  standalone: false
})
export class GdsFooter {
  public readonly currentYear: number = new Date().getFullYear();

  constructor(
    domSanitizer: DomSanitizer,
    matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry
      .addSvgIcon('logo-star-sgb', domSanitizer.bypassSecurityTrustResourceUrl(`assets/logo-star-sgb.svg`));
  }
}