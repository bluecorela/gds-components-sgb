import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GdsRadiobutton } from './gds-radiobutton';

const meta: Meta<GdsRadiobutton> = {
  title: 'GDS Components/GdsRadiobutton',
  component: GdsRadiobutton,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [GdsRadiobutton]
    })
  ],
  argTypes: {
    title: {
      control: 'text'
    },
    name: {
      control: 'text'
    },
    options: {
      control: 'object'
    }
  }
};

export default meta;

type Story = StoryObj<GdsRadiobutton>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      formController: new FormControl('s')
    }
  }),
  args: {
    title: '¿Eres residente permanente con domicilio en Panamá?',
    name: 'resident',
    options: [
      {
        value: 's',
        label: 'Sí'
      },
      {
        value: 'n',
        label: 'No'
      }
    ]
  }
};

export const Gender: Story = {
  render: (args) => ({
    props: {
      ...args,
      formController: new FormControl('f')
    }
  }),
  args: {
    title: 'Género',
    name: 'gender',
    options: [
      {
        value: 'f',
        label: 'Femenino'
      },
      {
        value: 'm',
        label: 'Masculino'
      }
    ]
  }
};

export const Resident: Story = {
  render: (args) => ({
    props: {
      ...args,
      formController: new FormControl('s')
    }
  }),
  args: {
    title: '¿Eres residente permanente con domicilio en Panamá?',
    name: 'resident',
    options: [
      {
        value: 's',
        label: 'Sí'
      },
      {
        value: 'n',
        label: 'No'
      }
    ]
  }
};
