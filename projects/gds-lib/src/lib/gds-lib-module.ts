import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GdsInput } from './components/gds-input/gds-input';
import { GdsAlert } from './components/gds-alert/gds-alert';
import { GdsCalendar } from './components/gds-calendar/gds-calendar';
import { GdsBullets } from './components/gds-bullets/gds-bullets';
import { GdsInputCalendar } from './components/gds-input/components/gds-input-calendar/gds-input-calendar';
import { GdsInputMoney } from './components/gds-input/components/gds-input-money/gds-input-money';
import { GdsInputPhone } from './components/gds-input/components/gds-input-phone/gds-input-phone';
import { GdsInputSearch } from './components/gds-input/components/gds-input-search/gds-input-search';
import { GdsInputText } from './components/gds-input/components/gds-input-text/gds-input-text';
import { GdsRadiobutton } from './components/gds-radiobutton/gds-radiobutton';
import { GdsFileUpload } from './components/gds-file-upload/gds-file-upload';
import { GdsFooter } from './components/gds-footer/gds-footer';
import { GdsHeader } from './components/gds-header/gds-header';
import { GdsLoader } from './components/gds-loader/gds-loader';
import { GdsModal } from './components/gds-modal/gds-modal';
import { GdsOtp } from './components/gds-otp/gds-otp';
import { GdsSadpath } from './components/gds-sadpath/gds-sadpath';
import { GdsSelect } from './components/gds-select/gds-select';
import { GdsShowdocument } from './components/gds-showdocument/gds-showdocument';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { Calendar } from './components/gds-calendar/calendar/calendar';
import { MatIcon } from "@angular/material/icon";
import { provideHttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

const angularMaterialComponents = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule
];

const gdsComponents = [
  GdsInput,
  GdsAlert,
  GdsCalendar,
  GdsBullets,
  GdsFileUpload,
  GdsHeader,
  GdsFooter,
  GdsShowdocument,
  GdsSelect,
  GdsSadpath,
  GdsRadiobutton,
  GdsOtp,
  GdsModal,
  GdsLoader
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
    gdsInputComponent,
    Calendar
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    angularMaterialComponents
    ,
    MatIcon
],
  exports: [
    gdsComponents
  ],
  providers: [
    provideHttpClient(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
})
export class GdsLibModule {}
