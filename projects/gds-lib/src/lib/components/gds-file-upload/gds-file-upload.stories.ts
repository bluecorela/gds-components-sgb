import { moduleMetadata, applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GdsFileUpload } from './gds-file-upload';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<GdsFileUpload> = {
  title: 'GDS Components/GdsFileUpload',
  component: GdsFileUpload,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule]
    }),
    applicationConfig({
      providers: [
        provideHttpClient(),
      ],
    }),
  ],
  argTypes: {
    title: {
      control: 'text'
    },
    body: {
      control: 'text'
    },
    maxFiles: {
      control: 'number'
    },
    maxFileSize: {
      control: 'number'
    },
    acceptedFileTypes: {
      control: 'text'
    },
    showStatus: {
      control: 'boolean'
    }
  }
};

export default meta;

type Story = StoryObj<GdsFileUpload>;

export const Default: Story = {
  args: {
    title: 'Ingresa los documentos:',
    body:
      'Identificación requerida. Puedes adjuntar la evidencia de ingresos y la proforma del inmueble de forma opcional para agilizar la evaluación.',
    maxFiles: 3,
    maxFileSize: 10 * 1024 * 1024,
    acceptedFileTypes: '.pdf,.png,.jpg,.jpeg',
    showStatus: true
  }
};

export const FailedFile: Story = {
  args: {
    title: 'Ingresa los documentos:',
    body: 'Identificación requerida. Puedes adjuntar la evidencia de ingresos y la proforma del inmueble de forma opcional para agilizar la evaluación.',
    showStatus: true,
    uploadedFiles: [
      {
        file: {} as File,
        name: 'archivo.pdf',
        size: '1.2 Mb',
        status: 'fallido',
      }
    ]
  }
};

export const SuccessFile: Story = {
  args: {
    title: 'Ingresa los documentos:',
    body: 'Identificación requerida. Puedes adjuntar la evidencia de ingresos y la proforma del inmueble de forma opcional para agilizar la evaluación.',
    showStatus: true,
    uploadedFiles: [
      {
        file: {} as File,
        name: 'archivo.pdf',
        size: '1.2 Mb',
        status: 'listo'
      }
    ]
  }
};
