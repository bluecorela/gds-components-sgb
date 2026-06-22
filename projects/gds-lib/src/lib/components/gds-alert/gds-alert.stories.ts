import { moduleMetadata, applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GdsAlert } from './gds-alert';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<GdsAlert> = {
  title: 'GDS Components/GdsAlert',
  component: GdsAlert,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsAlert],
      imports: [CommonModule, MatIconModule],
    }),
    applicationConfig({
      providers: [
        provideHttpClient(),
      ],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'error', 'success', 'neutral']
    },
    title: {
      control: 'text'
    },
    text: {
      control: 'text'
    },
    amount: {
      control: 'text'
    },
    showIcon: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<GdsAlert>;

export const Default: Story = {
  args: {
    type: 'info',
    title: 'Domicilio en Panamá',
    text: 'Estar legalmente establecido en Panamá para el cumplimiento de tus obligaciones y el ejercicio de tus derechos.',
    amount: '',
    showIcon: true,
  },
};

export const Showcase: Story = {
  render: () => ({
    template: `
      <div
      style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:600px; margin:0 auto; ">
        <lib-gds-alert
          type="info"
          title="Domicilio en Panamá"
          text="Estar legalmente establecido en Panamá para el cumplimiento de tus obligaciones y el ejercicio de tus derechos.">
        </lib-gds-alert>

        <lib-gds-alert
          type="info"
          title="Evidencia de ingresos"
          text="Corresponde a uno o más documentos oficiales que confirman los ingresos que percibes. Ej: Ficha de seguro o talonario.">
        </lib-gds-alert>

        <lib-gds-alert
          type="info"
          text="Asegúrate que las fechas sean correctas y reflejen tu historial laboral.">
        </lib-gds-alert>

        <lib-gds-alert
          type="error"
          text="Código ingresado es incorrecto. Te quedan solo 2 intentos.">
        </lib-gds-alert>

        <lib-gds-alert
          type="success"
          text="Reenviamos el código con éxito.">
        </lib-gds-alert>
        <lib-gds-alert
          type="neutral"
          text="Cuota mensual aproximada">
        </lib-gds-alert>
        <lib-gds-alert
          type="neutral"
          text="Cuota mensual aproximada"
          amount="$ 300.00">
        </lib-gds-alert>
      </div>
    `
  })
};
