import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface RadioOption {
  value: string;
  label: string;
}

@Component({
  selector: 'lib-gds-radiobutton',
  templateUrl: './gds-radiobutton.html',
  styleUrls: ['./gds-radiobutton.scss'],
  standalone: false
})
export class GdsRadiobutton {

  @Input() formController!: FormControl;

  @Input() name = '';

  @Input() title = '';

  @Input() options: RadioOption[] = [
    {
      value: 's',
      label: 'Sí'
    },
    {
      value: 'n',
      label: 'No'
    }
  ];
}
