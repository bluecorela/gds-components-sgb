import { inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GdsLoader, GdsLoaderData, GdsLoaderType } from './gds-loader';

const STYLE_ID = 'gds-loader-styles';

const GLOBAL_STYLES = `
  /* Spinner — backdrop semitransparente, ve la pantalla de fondo */
  .gds-loader-backdrop--translucent {
    background: rgba(0, 0, 0, 0.45) !important;
    backdrop-filter: blur(2px);
  }
  .gds-loader-panel--spinner .mat-mdc-dialog-surface {
    background: transparent !important;
    box-shadow: none !important;
  }

  /* Fullscreen — backdrop y panel blancos, pantalla de fondo invisible */
  .gds-loader-backdrop--solid {
    background: #ffffff !important;
  }
  .gds-loader-panel--fullscreen {
    max-height: 100vh !important;
  }
  .gds-loader-panel--fullscreen .mat-mdc-dialog-surface {
    background: #ffffff !important;
    box-shadow: none !important;
  }
`;

@Injectable({ providedIn: 'root' })
export class GdsLoaderService implements OnDestroy {
  private dialog = inject(MatDialog);
  private document = inject(DOCUMENT);
  private ref?: MatDialogRef<GdsLoader>;

  constructor() {
    this.injectStyles();
  }

  /**
   * Abre el loader. Si ya hay uno abierto no duplica.
   *
   * @param type  'fullscreen' (por defecto) | 'spinner'
   * @param data  subtitle, gifSrc opcionales
   */
  open(type: GdsLoaderType = 'fullscreen', data: Omit<GdsLoaderData, 'type'> = {}): void {
    if (this.ref) return;

    const isSpinner = type === 'spinner';

    this.ref = this.dialog.open(GdsLoader, {
      data: { type, ...data } satisfies GdsLoaderData,
      disableClose: true,
      hasBackdrop: true,
      backdropClass: isSpinner
        ? 'gds-loader-backdrop--translucent'
        : 'gds-loader-backdrop--solid',
      panelClass: isSpinner
        ? 'gds-loader-panel--spinner'
        : 'gds-loader-panel--fullscreen',
      maxWidth: isSpinner ? '160px' : '100vw',
      width: isSpinner ? 'auto' : '100%',
    });

    this.ref.afterClosed().subscribe(() => {
      this.ref = undefined;
    });
  }

  /** Cierra el loader activo (aplica a ambos tipos). */
  close(): void {
    this.ref?.close();
    this.ref = undefined;
  }

  /** Indica si hay un loader abierto actualmente. */
  get isOpen(): boolean {
    return !!this.ref;
  }

  ngOnDestroy(): void {
    this.document.getElementById(STYLE_ID)?.remove();
  }

  private injectStyles(): void {
    if (this.document.getElementById(STYLE_ID)) return;
    const style = this.document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = GLOBAL_STYLES;
    this.document.head.appendChild(style);
  }
}
