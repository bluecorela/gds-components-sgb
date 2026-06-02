import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdsInput } from './components/gds-input/gds-input';
import { GdsAlert } from './components/gds-alert/gds-alert';
import { GdsCalendar } from './components/gds-calendar/gds-calendar';
import { GdsBullets } from './components/gds-bullets/gds-bullets';
import { GdsInputCalendar } from './components/gds-input/components/gds-input-calendar/gds-input-calendar';
import { GdsInputMoney } from './components/gds-input/components/gds-input-money/gds-input-money';
import { GdsInputPhone } from './components/gds-input/components/gds-input-phone/gds-input-phone';
import { GdsInputSearch } from './components/gds-input/components/gds-input-search/gds-input-search';
import { GdsInputText } from './components/gds-input/components/gds-input-text/gds-input-text';

const gdsComponents = [
  GdsInput,
  GdsAlert,
  GdsCalendar,
  GdsBullets
];

const gdsInputComponent = [
  GdsInputCalendar,
  GdsInputMoney,
  GdsInputPhone,
  GdsInputSearch,
  GdsInputText
];

@NgModule({
  declarations: [
    gdsComponents,
    gdsInputComponent
  ],
  imports: [
    CommonModule,
    // MatIconModule
  ],
  exports: [
    gdsComponents
  ],
})
export class GdsLibModule {}
