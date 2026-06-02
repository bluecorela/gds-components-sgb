import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-gds-input',
  templateUrl: './gds-input.html',
  styleUrl: './gds-input.scss',
  standalone: false
})
export class GdsInput {
  @Input() type: 'text' | 'phone' | 'money' | 'calendar' | 'search' = 'text';
  @Input() disabled = false;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() label = '';
}