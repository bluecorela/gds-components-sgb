import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GdsInputSearch } from './gds-input-search';

const meta: Meta<GdsInputSearch> = {
  title: 'GDS Components/GdsInputSearch',
  component: GdsInputSearch,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideHttpClient()] }),
    moduleMetadata({
      declarations: [GdsInputSearch],
      imports: [CommonModule, MatIconModule],
    }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    showVoice: { control: 'boolean' },
    searchChange: { action: 'searchChange' },
    cleared: { action: 'cleared' },
    focused: { action: 'focused' },
  },
};

export default meta;
type Story = StoryObj<GdsInputSearch>;

/** Campo de búsqueda básico listo para usar */
export const Default: Story = {
  args: {
    placeholder: 'Buscar',
    showVoice: true,
  },
};

/** Campo con un valor inicial ya ingresado */
export const WithValue: Story = {
  args: {
    placeholder: 'Buscar',
    value: 'Jalisco',
    showVoice: true,
  },
};

/** Campo de búsqueda sin botón de micrófono */
export const WithoutVoice: Story = {
  args: {
    placeholder: 'Buscar municipio',
    showVoice: false,
  },
};

/** Búsqueda con placeholder personalizado */
export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Escribe para filtrar...',
    showVoice: true,
  },
};
