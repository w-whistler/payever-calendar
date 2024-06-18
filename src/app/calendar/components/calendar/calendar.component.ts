import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { dayOfWeekToString } from '../../../utils/time.utils';

@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    TimePickerComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  selectedDate: Date | null = null;

  dayOfWeekToString = dayOfWeekToString;
}
