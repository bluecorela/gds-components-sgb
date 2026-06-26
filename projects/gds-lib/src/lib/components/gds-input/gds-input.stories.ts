import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { GdsInput } from './gds-input';
import { GdsInputText } from './components/gds-input-text/gds-input-text';
import { GdsInputMoney } from './components/gds-input-money/gds-input-money';
import { GdsInputPhone } from './components/gds-input-phone/gds-input-phone';
import { GdsInputTextarea } from './components/gds-input-textarea/gds-input-textarea';

const meta: Meta<GdsInput> = {
  title: 'GDS Components/GdsInput',
  component: GdsInput,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideHttpClient()] }),
    moduleMetadata({
      declarations: [GdsInput, GdsInputText, GdsInputMoney, GdsInputPhone, GdsInputTextarea],
      imports: [CommonModule, ReactiveFormsModule, MatIconModule],
    }),
  ],
  argTypes: {
    formController: { control: false },
    type: {
      control: 'select',
      options: ['text', 'money', 'phone', 'textarea'],
    },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    readonly: { control: 'boolean' },
    optional: { control: 'boolean' },
    prefixPhone: { control: 'boolean' },
    countryCode: { control: 'text' },
    showErrors: { control: 'boolean' },
    errorColor: { control: 'color' },
    rows: { control: 'number' },
    maxLength: { control: 'number' },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<GdsInput>;

/** Texto básico */
export const Text: Story = {
  args: {
    type: 'text',
    title: 'Nombre',
    placeholder: 'Ingresa tu nombre',
    formController: new FormControl(''),
  },
};

/** Texto opcional */
export const TextOptional: Story = {
  args: {
    type: 'text',
    title: 'Apellido materno',
    placeholder: 'Ingresa tu apellido materno',
    optional: true,
    formController: new FormControl(''),
  },
};

/** Texto con validación */
export const TextWithValidation: Story = {
  args: {
    type: 'text',
    title: 'Email',
    placeholder: 'ejemplo@correo.com',
    formController: (() => {
      const ctrl = new FormControl('', [Validators.required, Validators.email]);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'email', message: 'Ingresa un email válido' },
    ],
  },
};

/** Texto con error en color personalizado */
export const TextCustomErrorColor: Story = {
  args: {
    type: 'text',
    title: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'La contraseña no cumple los requisitos' }],
    errorColor: '#DD890A',
  },
};

/** Monto */
export const Money: Story = {
  args: {
    type: 'money',
    title: 'Monto a transferir',
    placeholder: '0.00',
    formController: new FormControl(''),
  },
};

/** Monto con validación */
export const MoneyWithValidation: Story = {
  args: {
    type: 'money',
    title: 'Monto',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'El monto es requerido' }],
  },
};

/** Teléfono simple */
export const Phone: Story = {
  args: {
    type: 'phone',
    title: 'Teléfono',
    placeholder: '6000-0000',
    formController: new FormControl(''),
    maxLength: 8,
  },
};

/** Teléfono con código de país estático */
export const PhoneWithCountryCode: Story = {
  args: {
    type: 'phone',
    title: 'Teléfono',
    placeholder: '6000-0000',
    countryCode: '(+507)',
    formController: new FormControl('60001234'),
  },
};

/** Teléfono con código de área editable */
export const PhoneWithAreaCode: Story = {
  args: {
    type: 'phone',
    title: 'Teléfono con área',
    placeholder: 'Número',
    prefixPhone: true,
    formController: new FormGroup({
      prefix: new FormControl('664'),
      number: new FormControl(''),
    }),
  },
};

/** Textarea básica */
export const Textarea: Story = {
  args: {
    type: 'textarea',
    title: 'Comentarios',
    placeholder: 'Escribe aquí...',
    formController: new FormControl(''),
  },
};

/** Textarea con límite y subtítulo */
export const TextareaWithLimit: Story = {
  args: {
    type: 'textarea',
    title: 'Observaciones',
    subtitle: 'Máximo 200 caracteres',
    placeholder: 'Escribe tus observaciones...',
    maxLength: 200,
    rows: 6,
    formController: new FormControl(''),
  },
};
