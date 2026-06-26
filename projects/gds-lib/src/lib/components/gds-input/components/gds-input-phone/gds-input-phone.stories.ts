import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { GdsInputPhone } from './gds-input-phone';

const meta: Meta<GdsInputPhone> = {
  title: 'GDS Components/GdsInputPhone',
  component: GdsInputPhone,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsInputPhone],
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    formController: { control: false },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    prefixPhone: { control: 'boolean' },
    countryCode: { control: 'text' },
    maxLength: { control: 'number' },
    showErrors: { control: 'boolean' },
    errorColor: { control: 'color' },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<GdsInputPhone>;

/** Teléfono simple sin prefijo */
export const Default: Story = {
  args: {
    title: 'Teléfono',
    placeholder: '6000-0000',
    formController: new FormControl(''),
    maxLength: 8,
  },
};

/**
 * Con código de país estático — reemplaza el workaround anterior de
 * `type="TEXT" id="phone"`. El código aparece solo cuando hay valor.
 */
export const WithCountryCode: Story = {
  args: {
    title: 'Teléfono',
    placeholder: '6000-0000',
    countryCode: '(+507)',
    formController: new FormControl('60001234'),
    maxLength: 8,
  },
};

/** Código de país estático, campo vacío (el código no se muestra hasta escribir) */
export const WithCountryCodeEmpty: Story = {
  args: {
    title: 'Teléfono',
    placeholder: '6000-0000',
    countryCode: '(+507)',
    formController: new FormControl(''),
    maxLength: 8,
  },
};

/** Con campo de código de área editable (prefixPhone) usando FormGroup */
export const WithAreaCode: Story = {
  args: {
    title: 'Teléfono con área',
    placeholder: 'Número',
    prefixPhone: true,
    formController: new FormGroup({
      prefix: new FormControl('664'),
      number: new FormControl('1234567'),
    }),
  },
};

/** Con campo de código de área editable y control simple interno */
export const WithAreaCodeSimple: Story = {
  args: {
    title: 'Teléfono con área',
    placeholder: 'Número',
    prefixPhone: true,
    prefixValue: '55',
    formController: new FormControl(''),
    maxLength: 10,
  },
};

/** Con subtítulo */
export const WithSubtitle: Story = {
  args: {
    title: 'Celular',
    subtitle: 'Ingresa tu número a 8 dígitos',
    placeholder: '6000-0000',
    formController: new FormControl(''),
  },
};

/** Con validación */
export const WithValidation: Story = {
  args: {
    title: 'Teléfono',
    placeholder: '6000-0000',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'El teléfono es requerido' }],
  },
};

/** Mensaje de error con color naranja */
export const CustomErrorColor: Story = {
  args: {
    title: 'Teléfono',
    placeholder: '6000-0000',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'El teléfono es requerido' }],
    errorColor: '#DD890A',
  },
};
