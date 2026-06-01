import { Component, Input } from '@angular/core';
type AlertType = 'info' | 'error' | 'success';

@Component({
  selector: 'lib-gds-alert',
  templateUrl: './gds-alert.html',
  styleUrl: './gds-alert.scss',
  standalone: false,
})
export class GdsAlert {
  @Input() text: string = 'empty';
  @Input() type: AlertType = 'info';
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';

  constructor() {}
}