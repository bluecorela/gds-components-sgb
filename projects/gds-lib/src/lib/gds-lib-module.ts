import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdsInput } from './components/gds-input/gds-input';
import { GdsAlert } from './components/gds-alert/gds-alert';
import { GdsCalendar } from './components/gds-calendar/gds-calendar';

@NgModule({
  declarations: [
    GdsInput,
    GdsAlert,
    GdsCalendar
  ],
  imports: [
    CommonModule,
    // MatIconModule
  ],
  exports: [
    GdsInput,
    GdsAlert,
    GdsCalendar
  ],
})
export class GdsLibModule {}
