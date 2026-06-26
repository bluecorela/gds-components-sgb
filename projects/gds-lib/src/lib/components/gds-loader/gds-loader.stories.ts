import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GdsLoader } from './gds-loader';

const dialogRefStub = { close: () => {} };

const meta: Meta<GdsLoader> = {
  title: 'GDS Components/GdsLoader',
  component: GdsLoader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Uso

\`GdsLoader\` **no se coloca en el template**. Se abre y cierra mediante \`GdsLoaderService\`:

\`\`\`typescript
import { GdsLoaderService } from 'gds-lib';

private loaderService = inject(GdsLoaderService);

// Fullscreen — pantalla completa, fondo blanco
this.loaderService.open('fullscreen');
this.loaderService.open('fullscreen', { subtitle: 'Procesando tu pago...' });

// Spinner — backdrop semitransparente, la pantalla de fondo se ve
this.loaderService.open('spinner');

// Cerrar (aplica a ambos tipos)
this.loaderService.close();
\`\`\`

> El servicio está en \`providedIn: 'root'\`, no necesitas registrarlo en ningún módulo.
        `,
      },
    },
  },
  decorators: [
    applicationConfig({ providers: [] }),
    moduleMetadata({
      declarations: [GdsLoader],
      imports: [CommonModule, MatDialogModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<GdsLoader>;

/** Fullscreen — con subtítulo por defecto */
export const Fullscreen: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { type: 'fullscreen' } },
      ],
    }),
  ],
  render: () => ({}),
};

/** Fullscreen — con subtítulo personalizado */
export const FullscreenCustomSubtitle: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            type: 'fullscreen',
            subtitle: 'Procesando tu solicitud, esto puede tomar unos segundos...',
          },
        },
      ],
    }),
  ],
  render: () => ({}),
};

/** Spinner — solo el GIF centrado */
export const Spinner: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { type: 'spinner' } },
      ],
    }),
  ],
  render: () => ({}),
};
