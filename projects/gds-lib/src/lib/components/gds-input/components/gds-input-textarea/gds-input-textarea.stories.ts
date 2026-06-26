import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { GdsInputTextarea } from './gds-input-textarea';

const meta: Meta<GdsInputTextarea> = {
  title: 'GDS Components/GdsInputTextarea',
  component: GdsInputTextarea,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsInputTextarea],
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    formController: { control: false },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    rows: { control: 'number' },
    maxLength: { control: 'number' },
    showErrors: { control: 'boolean' },
    errorColor: { control: 'color' },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<GdsInputTextarea>;

/** Área de texto básica */
export const Default: Story = {
  args: {
    title: 'Comentarios',
    placeholder: 'Escribe aquí...',
    formController: new FormControl(''),
  },
};

/** Con valor inicial */
export const WithValue: Story = {
  args: {
    title: 'Descripción',
    formController: new FormControl('Este es un texto de ejemplo con contenido previo.'),
  },
};

/** Con subtítulo y límite de caracteres */
export const WithSubtitleAndLimit: Story = {
  args: {
    title: 'Observaciones',
    subtitle: 'Máximo 200 caracteres',
    placeholder: 'Escribe tus observaciones...',
    maxLength: 200,
    formController: new FormControl(''),
  },
};

/** Con validación requerida */
export const WithValidation: Story = {
  args: {
    title: 'Motivo',
    placeholder: 'Explica el motivo de tu solicitud',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'El motivo es requerido' }],
  },
};

/** Más alto (8 filas) */
export const Tall: Story = {
  args: {
    title: 'Descripción larga',
    placeholder: 'Escribe aquí...',
    rows: 8,
    formController: new FormControl(''),
  },
};

/** Mensaje de error con color naranja */
export const CustomErrorColor: Story = {
  args: {
    title: 'Comentarios',
    placeholder: 'Escribe aquí...',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'Este campo es requerido' }],
    errorColor: '#DD890A',
  },
};
