import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GdsInput } from './gds-input';

const meta: Meta<GdsInput> = {
  title: 'GDS Components/GdsInput',
  component: GdsInput,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsInput],
      imports: [CommonModule, FormsModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<GdsInput>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    required: true,
  },
};