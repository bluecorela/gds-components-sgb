import { Component } from '@angular/core';

@Component({
  selector: 'lib-gds-calendar',
  templateUrl: './gds-calendar.html',
  styleUrl: './gds-calendar.scss',
  standalone: false,
})
export class GdsCalendar {
  public isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }
}