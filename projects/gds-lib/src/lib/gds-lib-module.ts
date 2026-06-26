import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

// Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

// HTTP
import { provideHttpClient } from '@angular/common/http';

// GDS Components
import { GdsInput } from './components/gds-input/gds-input';
import { GdsAlert } from './components/gds-alert/gds-alert';
import { GdsCalendar } from './components/gds-calendar/gds-calendar';
import { GdsBullets } from './components/gds-bullets/gds-bullets';
import { GdsFileUpload } from './components/gds-file-upload/gds-file-upload';
import { GdsFooter } from './components/gds-footer/gds-footer';
import { GdsHeader } from './components/gds-header/gds-header';
import { GdsLoader } from './components/gds-loader/gds-loader';
import { GdsModal } from './components/gds-modal/gds-modal';
import { GdsModalToken } from './components/gds-modal/gds-modal-token/gds-modal-token';
import { GdsOtp } from './components/gds-otp/gds-otp';
import { GdsRadiobutton } from './components/gds-radiobutton/gds-radiobutton';
import { GdsSadpath } from './components/gds-sadpath/gds-sadpath';
import { GdsSelect } from './components/gds-select/gds-select';
import { GdsShowdocument } from './components/gds-showdocument/gds-showdocument';
import { Calendar } from './components/gds-calendar/calendar/calendar';

// GDS Input Sub-components
import { GdsInputCalendar } from './components/gds-input/components/gds-input-calendar/gds-input-calendar';
import { GdsInputMoney } from './components/gds-input/components/gds-input-money/gds-input-money';
import { GdsInputPhone } from './components/gds-input/components/gds-input-phone/gds-input-phone';
import { GdsInputSearch } from './components/gds-input/components/gds-input-search/gds-input-search';
import { GdsInputText } from './components/gds-input/components/gds-input-text/gds-input-text';
import { GdsInputTextarea } from './components/gds-input/components/gds-input-textarea/gds-input-textarea';
import { GdsButton } from './components/gds-button/gds-button';

const angularMaterialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  ReactiveFormsModule
];

const gdsComponents = [
  GdsInput,
  GdsAlert,
  GdsCalendar,
  GdsBullets,
  GdsFileUpload,
  GdsButton,
  GdsHeader,
  GdsFooter,
  GdsShowdocument,
  GdsSelect,
  GdsSadpath,
  GdsRadiobutton,
  GdsOtp,
  GdsModal,
  GdsLoader,
  GdsModalToken,
];

const gdsInputComponents = [
  GdsInputCalendar,
  GdsInputMoney,
  GdsInputPhone,
  GdsInputSearch,
  GdsInputText,
  GdsInputTextarea,
];

@NgModule({
  declarations: [
    ...gdsComponents,
    ...gdsInputComponents,
    Calendar,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    ...angularMaterialModules,
    MatIcon,
  ],
  exports: [
    ...gdsComponents,
    ...gdsInputComponents,
  ],
  providers: [
    provideHttpClient(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class GdsLibModule {}
