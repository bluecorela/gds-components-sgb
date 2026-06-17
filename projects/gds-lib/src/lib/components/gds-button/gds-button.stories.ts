import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GdsButton } from './gds-button';

const meta: Meta<GdsButton> = {
  title: 'GDS Components/GdsButton',
  component: GdsButton,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsButton],
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'outline'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<GdsButton>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: center;">
        <lib-gds-button label="Continuar" variant="primary"></lib-gds-button>
        <lib-gds-button label="Verificar disponibilidad" variant="outline"></lib-gds-button>
        <lib-gds-button label="Verificar disponibilidad" variant="outline" [disabled]="true"></lib-gds-button>
        <lib-gds-button label="Continuar" variant="primary" [disabled]="true"></lib-gds-button>
      </div>
    `,
  }),
};
