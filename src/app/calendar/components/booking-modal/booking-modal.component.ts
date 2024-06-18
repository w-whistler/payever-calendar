import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CalendarService } from '../../services';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.scss',
})
export class BookingModalComponent {
  formGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<BookingModalComponent>,
    private cs: CalendarService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      timeSlot: number;
    }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.cs.saveAppointment({
      timeRange: {
        start: this.data.timeSlot,
        end: this.data.timeSlot + 1,
      },
      title: this.formGroup.get('title')?.value,
    });

    this.dialogRef.close();
  }
}
