import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-gds-button',
  templateUrl: './gds-button.html',
  styleUrl: './gds-button.scss',
  standalone: false,
})
export class GdsButton {
  @Input() label = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'outline'  = 'primary';
  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}
