import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GdsOtp } from '../../gds-otp/gds-otp';

export interface GdsModalTokenData {
  counter$?: Observable<number>;
  token$?: Observable<string>;
  showCounter?: boolean;
}

@Component({
  selector: 'lib-gds-modal-token',
  templateUrl: './gds-modal-token.html',
  styleUrl: './gds-modal-token.scss',
  standalone: false,
})
export class GdsModalToken implements OnInit, OnDestroy {
  @ViewChild('otpRef') otpRef?: GdsOtp;

  private readonly dialogRef = inject(MatDialogRef<GdsModalToken>);
  readonly data: GdsModalTokenData = inject(MAT_DIALOG_DATA);

  private readonly destroy$ = new Subject<void>();

  counter: number = 30;
  counterDisplay: string = '30';
  tokenValue: string = '';
  otpValue: string = '';
  otpDisabled: boolean = false;
  confirmDisabled: boolean = true;

  ngOnInit(): void {
    const { counter$, token$ } = this.data;

    if (counter$) {
      counter$.pipe(takeUntil(this.destroy$)).subscribe((seconds) => {
        this.counter = seconds;
        this.counterDisplay = seconds < 10 ? `0${seconds}` : `${seconds}`;
      });
    }

    if (token$) {
      token$.pipe(takeUntil(this.destroy$)).subscribe((token) => {
        this.tokenValue = token;
        this.otpValue = token;
        this.otpDisabled = true;
        this.confirmDisabled = token.length !== 6;
        setTimeout(() => {
          if (this.otpRef) {
            this.otpRef.value = token;
            this.otpRef.ngOnChanges({ value: { currentValue: token } as any });
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOtpChange(value: string): void {
    this.otpValue = value;
    this.confirmDisabled = value.length !== 6;
  }

  confirm(): void {
    this.dialogRef.close({ message: 'token-confirmed', code: this.otpValue });
  }

  close(): void {
    this.dialogRef.close();
  }

  getTimeClass(): string {
    if (this.counter <= 5) return 'time-danger';
    if (this.counter <= 15) return 'time-warning';
    return 'time-normal';
  }
}
