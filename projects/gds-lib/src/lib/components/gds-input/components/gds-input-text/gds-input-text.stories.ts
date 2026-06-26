import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { GdsInputText } from './gds-input-text';

const meta: Meta<GdsInputText> = {
  title: 'GDS Components/GdsInputText',
  component: GdsInputText,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsInputText],
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    formController: { control: false },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    readonly: { control: 'boolean' },
    optional: { control: 'boolean' },
    showErrors: { control: 'boolean' },
    errorColor: { control: 'color' },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<GdsInputText>;

/** Campo de texto básico */
export const Default: Story = {
  args: {
    title: 'Nombre',
    placeholder: 'Ingresa tu nombre',
    formController: new FormControl(''),
  },
};

/** Campo con subtítulo informativo */
export const WithSubtitle: Story = {
  args: {
    title: 'Usuario',
    subtitle: 'Solo letras y espacios',
    placeholder: 'Ingresa tu usuario',
    formController: new FormControl(''),
  },
};

/** Campo con validación — toca el campo y déjalo vacío para ver el error */
export const WithValidation: Story = {
  args: {
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

/** Campo de solo lectura */
export const Readonly: Story = {
  args: {
    title: 'CURP',
    placeholder: 'CURP',
    readonly: true,
    formController: new FormControl('ABCD123456HDFABC01'),
  },
};

/** Campo opcional */
export const Optional: Story = {
  args: {
    title: 'Apellido materno',
    placeholder: 'Ingresa tu apellido materno',
    optional: true,
    formController: new FormControl(''),
  },
};

/** Campo con patrón: solo letras y acentos */
export const WithPattern: Story = {
  args: {
    title: 'Municipio',
    placeholder: 'Solo letras',
    textPattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/,
    formController: new FormControl(''),
  },
};

/** Mensaje de error con color naranja (caso advertencia) */
export const CustomErrorColor: Story = {
  args: {
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
