import { moduleMetadata, applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GdsFooter } from './gds-footer';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<GdsFooter> = {
  title: 'GDS Components/GdsFooter',
  component: GdsFooter,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [GdsFooter],
      imports: [
        CommonModule,
        MatIconModule,
      ],
    }),
    applicationConfig({
      providers: [
        provideHttpClient(),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<GdsFooter>;

export const Default: Story = {};
