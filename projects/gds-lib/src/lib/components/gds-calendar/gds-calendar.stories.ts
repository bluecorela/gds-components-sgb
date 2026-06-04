import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from "@angular/common";
import { GdsCalendar } from "./gds-calendar";
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { Calendar } from './calendar/calendar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const meta: Meta<GdsCalendar> = {
  title: 'GDS Components/GdsCalendar',
  component: GdsCalendar,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
        declarations: [
            GdsCalendar,
            Calendar
        ],
        imports: [
            CommonModule,
            FormsModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatInputModule,
            OverlayModule,
            MatIconModule,
            MatButtonModule
        ]
    }),
  ],
};

export default meta;
type Story = StoryObj<GdsCalendar>;

export const Default: Story = {
  args: {},
};