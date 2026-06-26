import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { GdsSelect } from './gds-select';
import { GdsInputSearch } from '../gds-input/components/gds-input-search/gds-input-search';

const STRING_LIST = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'México',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

const OBJECT_LIST = STRING_LIST.map((nombre, i) => ({ id: i + 1, nombre }));

const meta: Meta<GdsSelect> = {
  title: 'GDS Components/GdsSelect',
  component: GdsSelect,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideHttpClient()] }),
    moduleMetadata({
      declarations: [GdsSelect, GdsInputSearch],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
      ],
    }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    optional: { control: 'boolean' },
    enableSearch: { control: 'boolean' },
    optimizeLargeList: { control: 'boolean' },
    key: { control: 'text' },
    formController: { control: false },
    items: { control: false },
    list: { control: false },
    validations: { control: false },
    valueChange: { action: 'valueChange' },
  },
};

export default meta;
type Story = StoryObj<GdsSelect>;

/** Dropdown simple con lista de strings */
export const Default: Story = {
  args: {
    formController: new FormControl(''),
    placeholder: 'Selecciona un estado',
    list: STRING_LIST,
  },
};

/** Dropdown con lista de objetos — usa `key` para mostrar la etiqueta */
export const WithObjects: Story = {
  args: {
    formController: new FormControl(null),
    placeholder: 'Selecciona un estado',
    items: OBJECT_LIST,
    key: 'nombre',
  },
};

/** Dropdown con buscador interno habilitado */
export const WithSearch: Story = {
  args: {
    formController: new FormControl(''),
    placeholder: 'Selecciona un estado',
    list: STRING_LIST,
    enableSearch: true,
  },
};

/** Dropdown con buscador sobre lista de objetos */
export const WithSearchAndObjects: Story = {
  args: {
    formController: new FormControl(null),
    placeholder: 'Selecciona un estado',
    items: OBJECT_LIST,
    key: 'nombre',
    enableSearch: true,
  },
};

/** Dropdown opcional — muestra la etiqueta "Opcional" cuando no hay valor */
export const Optional: Story = {
  args: {
    formController: new FormControl(''),
    placeholder: 'Selecciona un estado',
    list: STRING_LIST,
    optional: true,
  },
};

/** Dropdown con validación requerida */
export const WithValidation: Story = {
  args: {
    formController: new FormControl('', Validators.required),
    placeholder: 'Selecciona un estado',
    list: STRING_LIST,
    validations: [{ type: 'required', message: 'Este campo es requerido' }],
  },
};

/** Dropdown con buscador y carga por lotes (optimizado para listas grandes) */
export const LargeListOptimized: Story = {
  args: {
    formController: new FormControl(''),
    placeholder: 'Selecciona una opción',
    list: Array.from({ length: 500 }, (_, i) => `Opción ${i + 1}`),
    enableSearch: true,
    optimizeLargeList: true,
  },
};
