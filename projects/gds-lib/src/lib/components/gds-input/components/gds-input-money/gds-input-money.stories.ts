import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { GdsInputMoney } from './gds-input-money';

const meta: Meta<GdsInputMoney> = {
  title: 'GDS Components/GdsInputMoney',
  component: GdsInputMoney,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsInputMoney],
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    formController: { control: false },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showErrors: { control: 'boolean' },
    errorColor: { control: 'color' },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<GdsInputMoney>;

/** Campo de monto básico */
export const Default: Story = {
  args: {
    title: 'Monto a transferir',
    placeholder: '0.00',
    formController: new FormControl(''),
  },
};

/** Campo con valor inicial */
export const WithValue: Story = {
  args: {
    title: 'Saldo disponible',
    formController: new FormControl('1,250.00'),
  },
};

/** Campo con subtítulo */
export const WithSubtitle: Story = {
  args: {
    title: 'Monto',
    subtitle: 'Monto máximo: $9,999.99',
    placeholder: '0.00',
    formController: new FormControl(''),
  },
};

/** Campo con validación requerida */
export const WithValidation: Story = {
  args: {
    title: 'Monto a pagar',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'El monto es requerido' }],
  },
};

/** Mensaje de error con color naranja */
export const CustomErrorColor: Story = {
  args: {
    title: 'Monto',
    formController: (() => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsTouched();
      return ctrl;
    })(),
    validations: [{ type: 'required', message: 'Ingresa un monto válido' }],
    errorColor: '#DD890A',
  },
};
