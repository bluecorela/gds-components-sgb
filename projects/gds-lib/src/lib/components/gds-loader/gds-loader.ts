import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export type GdsLoaderType = 'fullscreen' | 'spinner';

export interface GdsLoaderData {
  type?: GdsLoaderType;
  /** Texto debajo del título. Solo aplica en `fullscreen`. */
  subtitle?: string;
  /** Ruta del GIF. Default: assets/loader-sgb.gif */
  gifSrc?: string;
}

@Component({
  selector: 'lib-gds-loader',
  templateUrl: './gds-loader.html',
  styleUrl: './gds-loader.scss',
  standalone: false,
})
export class GdsLoader {
  readonly data: GdsLoaderData = inject(MAT_DIALOG_DATA, { optional: true }) ?? {};

  get type(): GdsLoaderType {
    return this.data.type ?? 'fullscreen';
  }

  get subtitle(): string {
    return this.data.subtitle ?? 'Estamos validando tus datos, por favor mantén abierta la app';
  }

  get gifSrc(): string {
    return this.data.gifSrc ?? 'assets/loader-sgb.gif';
  }
}
