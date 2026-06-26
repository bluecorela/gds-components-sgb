import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export type GdsModalType = 'RATES' | 'EXIT' | 'INFO';

export interface GdsModalData {
  type: GdsModalType;

  // ── RATES ─────────────────────────────────────────────────────────────────
  rates?: Array<Record<string, string>>;

  // ── INFO ──────────────────────────────────────────────────────────────────
  infoText?: string;
  infoBold?: string;
}

@Component({
  selector: 'lib-gds-modal',
  templateUrl: './gds-modal.html',
  styleUrl: './gds-modal.scss',
  standalone: false,
})
export class GdsModal implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<GdsModal>);
  readonly data: GdsModalData = inject(MAT_DIALOG_DATA);

  ratesTable: string[] = [];

  constructor(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry) {
    matIconRegistry.addSvgIcon(
      'gds-modal-info',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/info.svg')
    );
  }

  ngOnInit(): void {
    if (this.data.type === 'RATES') {
      const rows = (this.data.rates ?? []).flatMap((item) => Object.values(item));
      this.ratesTable = ['Cantidad', 'Tasas', ...rows];
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmExit(): void {
    this.dialogRef.close('exit');
  }

  get infoTextParts(): { text: string; bold: boolean }[] {
    const text = this.data.infoText || '';
    const bold = this.data.infoBold;
    if (!bold || !text.includes(bold)) return [{ text, bold: false }];
    return text.split(bold).flatMap((part, i, arr) =>
      i < arr.length - 1
        ? [{ text: part, bold: false }, { text: bold, bold: true }]
        : [{ text: part, bold: false }]
    );
  }
}
