import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, interval, map } from 'rxjs';
import { GdsModalToken } from './gds-modal-token';
import { GdsOtp } from '../../gds-otp/gds-otp';

function makeCounter$(start = 30) {
  return interval(1000).pipe(map((i) => Math.max(0, start - i - 1)));
}

const dialogRefStub = {
  close: (result?: any) => console.log('[GdsModalToken] close:', result),
};

const meta: Meta<GdsModalToken> = {
  title: 'GDS Components/GdsModalToken',
  component: GdsModalToken,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Uso

\`GdsModalToken\` **no se coloca en el template**. Se abre directamente con \`MatDialog\`:

\`\`\`typescript
import { GdsModalToken, GdsModalTokenData } from 'gds-lib';
import { interval, map } from 'rxjs';

private dialog = inject(MatDialog);

// Contador regresivo de 30 segundos
const counter$ = interval(1000).pipe(map((i) => Math.max(0, 29 - i)));

const ref = this.dialog.open(GdsModalToken, {
  data: {
    showCounter: true,
    counter$,
  } satisfies GdsModalTokenData,
  disableClose: true,
});

ref.afterClosed().subscribe((result) => {
  if (result?.message === 'token-confirmed') {
    console.log('Código ingresado:', result.code); // e.g. '482931'
  }
});
\`\`\`

### Auto-fill desde servicio

Si tu servicio entrega el token automáticamente (SMS/push), pásalo via \`token$\`:

\`\`\`typescript
const token$ = this.authService.token$; // Observable<string>

this.dialog.open(GdsModalToken, {
  data: {
    showCounter: true,
    counter$,
    token$, // llena los 6 boxes automáticamente al emitir
  } satisfies GdsModalTokenData,
});
\`\`\`
        `,
      },
    },
  },
  decorators: [
    applicationConfig({ providers: [provideHttpClient()] }),
    moduleMetadata({
      declarations: [GdsModalToken, GdsOtp],
      imports: [CommonModule, MatDialogModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<GdsModalToken>;

/** Entrada manual del token por el usuario */
export const Manual: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            showCounter: true,
            counter$: makeCounter$(30),
          },
        },
      ],
    }),
  ],
  render: () => ({}),
};

/** Sin contador */
export const WithoutCounter: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { showCounter: false } },
      ],
    }),
  ],
  render: () => ({}),
};

/** Auto-fill — simula que el servicio entrega el token tras 1 segundo */
export const AutoFill: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: (() => {
            const token$ = new Subject<string>();
            setTimeout(() => token$.next('482931'), 1000);
            return {
              showCounter: true,
              counter$: makeCounter$(30),
              token$: token$.asObservable(),
            };
          })(),
        },
      ],
    }),
  ],
  render: () => ({}),
};
