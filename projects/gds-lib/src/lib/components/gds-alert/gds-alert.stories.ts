import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GdsAlert } from './gds-alert';

const meta: Meta<GdsAlert> = {
  title: 'GDS Components/GdsAlert',
  component: GdsAlert,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsAlert],
      imports: [CommonModule, FormsModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'error', 'success'],
    },
    disabled: { control: 'boolean' }
  },
};

export default meta;
type Story = StoryObj<GdsAlert>;

export const Default: Story = {
  args: {
    text: 'Corresponde a uno o más documentos oficiales que confirman los ingresos que percibes. Ej: Ficha de seguro o talonario.',
    placeholder: 'Enter your text alert',
    type: 'info'
  }
};
