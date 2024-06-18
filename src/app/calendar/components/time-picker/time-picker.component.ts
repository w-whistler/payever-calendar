import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { timeToTimeString } from '../../../utils/time.utils';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { CalendarService } from '../../services';
import { IAppointment } from '../../models';
import { startWith } from 'rxjs';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDragPreview,
  ],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
})
export class TimePickerComponent implements OnInit {
  @Input() selectedDate!: Date;

  hours = Array.from({ length: 24 }, (_, index) => index);
  timeSlots = Array.from({ length: 24 * 4 }, (_, index) => index);
  appointments: IAppointment[] = [];

  timeToTimeString = timeToTimeString;

  constructor(
    public dialog: MatDialog,
    public cs: CalendarService
  ) {}

  ngOnInit(): void {
    this.cs.appointmentsSubject.subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  getStartPosition(appointment: IAppointment) {
    return `${appointment.timeRange.start * 25 - 1}px`;
  }

  getAppointmentSlotHeight() {
    return '24px';
  }

  clickDate(timeSlot: number) {
    this.dialog.open(BookingModalComponent, {
      data: {
        timeSlot,
      },
    });
  }

  drop(event: CdkDragDrop<number[], IAppointment>) {
    if (
      event.previousContainer.id !== event.container.id &&
      event.container.id === 'cdk-container'
    ) {
      this.cs.saveAppointment({
        ...event.previousContainer.data,
        timeRange: {
          start: event.currentIndex,
          end: event.currentIndex + 1,
        },
      });
    }
  }

  canDragItemEnter() {
    return false;
  }

  clickAppointment(appointment: IAppointment) {
    this.dialog.open(BookDetailsModalComponent, {
      data: appointment,
    });
  }
}
