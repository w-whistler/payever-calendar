import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CalendarService } from '../../services';
import { IAppointment } from '../../models';

@Component({
  selector: 'app-book-details-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './book-details-modal.component.html',
  styleUrl: './book-details-modal.component.scss',
})
export class BookDetailsModalComponent {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BookDetailsModalComponent>,
    private cs: CalendarService,
    @Inject(MAT_DIALOG_DATA)
    public data: IAppointment
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl({ value: data.title, disabled: true }),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.cs.removeAppointment(this.data);
    this.dialogRef.close();
  }
}
