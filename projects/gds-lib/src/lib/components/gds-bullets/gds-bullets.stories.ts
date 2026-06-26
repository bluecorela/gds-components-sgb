import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GdsBullets } from './gds-bullets';

const meta: Meta<GdsBullets> = {
  title: 'GDS Components/GdsBullets',
  component: GdsBullets,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideHttpClient()] }),
    moduleMetadata({
      declarations: [GdsBullets],
      imports: [CommonModule, MatIconModule],
    }),
  ],
  argTypes: {
    items: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<GdsBullets>;

/** Todos los ítems inválidos (estado inicial) */
export const AllInvalid: Story = {
  args: {
    items: [
      { label: 'Mínimo 8 caracteres', valid: false },
      { label: 'Al menos una letra mayúscula', valid: false },
      { label: 'Al menos una letra minúscula', valid: false },
      { label: 'Al menos un número', valid: false },
      { label: 'Al menos un carácter especial (!@#$...)', valid: false },
    ],
  },
};

/** Algunos ítems válidos */
export const PartiallyValid: Story = {
  args: {
    items: [
      { label: 'Mínimo 8 caracteres', valid: true },
      { label: 'Al menos una letra mayúscula', valid: true },
      { label: 'Al menos una letra minúscula', valid: true },
      { label: 'Al menos un número', valid: false },
      { label: 'Al menos un carácter especial (!@#$...)', valid: false },
    ],
  },
};

/** Todos los ítems válidos */
export const AllValid: Story = {
  args: {
    items: [
      { label: 'Mínimo 8 caracteres', valid: true },
      { label: 'Al menos una letra mayúscula', valid: true },
      { label: 'Al menos una letra minúscula', valid: true },
      { label: 'Al menos un número', valid: true },
      { label: 'Al menos un carácter especial (!@#$...)', valid: true },
    ],
  },
};

/** Lista corta — 2 ítems */
export const Short: Story = {
  args: {
    items: [
      { label: 'Acepto los términos y condiciones', valid: true },
      { label: 'Acepto la política de privacidad', valid: false },
    ],
  },
};
