import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export type AlertType = 'info' | 'error' | 'success' | 'neutral';

@Component({
  selector: 'lib-gds-alert',
  templateUrl: './gds-alert.html',
  styleUrl: './gds-alert.scss',
  standalone: false,
})
export class GdsAlert {
  @Input() title?: string;
  @Input() text = '';
  @Input() type: AlertType = 'info';
  @Input() amount?: string;
  @Input() showIcon = true;

  constructor(
    domSanitizer: DomSanitizer,
    matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry
      .addSvgIcon('info_blue',domSanitizer.bypassSecurityTrustResourceUrl('assets/info_blue.svg'))
      .addSvgIcon('info_red',domSanitizer.bypassSecurityTrustResourceUrl('assets/info_red.svg'))
      .addSvgIcon('bullet',domSanitizer.bypassSecurityTrustResourceUrl('assets/bullet.svg'));
  }

  get iconName(): string {
    switch (this.type) {
      case 'error':
        return 'info_red';

      case 'success':
        return 'bullet';

      default:
        return 'info_blue';
    }
  }
}
