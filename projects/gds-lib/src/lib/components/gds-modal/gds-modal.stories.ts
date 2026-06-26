import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GdsModal } from './gds-modal';

const dialogRefStub = {
  close: (result?: any) => console.log('[GdsModal] close:', result),
};

const sharedDecorators = [
  applicationConfig({ providers: [provideHttpClient()] }),
  moduleMetadata({
    declarations: [GdsModal],
    imports: [CommonModule, MatIconModule, MatDialogModule],
  }),
];

const meta: Meta<GdsModal> = {
  title: 'GDS Components/GdsModal',
  component: GdsModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Uso

\`GdsModal\` **no se coloca en el template**. Se abre mediante \`MatDialog\`:

\`\`\`typescript
import { GdsModal, GdsModalData } from 'gds-lib';

private dialog = inject(MatDialog);

// Modal de tasas
this.dialog.open(GdsModal, {
  data: {
    type: 'RATES',
    rates: [
      { amount: '< $5,000', rate: '2.50%' },
      { amount: '$5,000 - $10,000', rate: '3.00%' },
    ],
  } satisfies GdsModalData,
});

// Modal de salida — escucha si el usuario confirma
this.dialog.open(GdsModal, {
  data: { type: 'EXIT' } satisfies GdsModalData,
}).afterClosed().subscribe((result) => {
  if (result === 'exit') {
    // navegar fuera del flujo
  }
});

// Modal informativo con texto en negrita
this.dialog.open(GdsModal, {
  data: {
    type: 'INFO',
    infoText: 'Tu Cuenta Premia Pro tiene beneficios especiales.',
    infoBold: 'Premia Pro',
  } satisfies GdsModalData,
});
\`\`\`

> Para el modal de token usa \`GdsModalToken\` directamente.
        `,
      },
    },
  },
  decorators: sharedDecorators,
};

export default meta;
type Story = StoryObj<GdsModal>;

export const Rates: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            type: 'RATES',
            rates: [
              { amount: '< $5,000', rate: '2.50%' },
              { amount: '$5,000 - $10,000', rate: '3.00%' },
              { amount: '$10,000 - $25,000', rate: '3.50%' },
              { amount: '> $25,000', rate: '4.00%' },
            ],
          },
        },
      ],
    }),
  ],
  render: () => ({}),
};

export const Exit: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { type: 'EXIT' } },
      ],
    }),
  ],
  render: () => ({}),
};

export const Info: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            type: 'INFO',
            infoText:
              'Con tu Cuenta Premia Pro puedes transferir y recibir fondos según tu perfil. En caso necesario, el banco solicitará información adicional para validar tus ingresos.',
            infoBold: 'Premia Pro',
          },
        },
      ],
    }),
  ],
  render: () => ({}),
};
