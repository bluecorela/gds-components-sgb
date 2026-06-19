import { moduleMetadata, applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GdsHeader } from './gds-header';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<GdsHeader> = {
  title: 'GDS Components/GdsHeader',
  component: GdsHeader,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsHeader],
      imports: [
        CommonModule,
        MatIconModule,
      ],
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
      options: ['NORMAL', 'STEPPER', 'NUMBERS'],
    },
  },
};

export default meta;
type Story = StoryObj<GdsHeader>;

export const Default: Story = {
  args: {
    type: 'NORMAL',
  },
};
