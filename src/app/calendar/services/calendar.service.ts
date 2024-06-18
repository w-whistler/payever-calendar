import { Injectable } from '@angular/core';
import { IAppointment } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private appointments: IAppointment[] = [];
  public appointmentsSubject: BehaviorSubject<IAppointment[]> =
    new BehaviorSubject<IAppointment[]>([]);
  public appointments$: Observable<IAppointment[]> =
    this.appointmentsSubject.asObservable();

  constructor() {}

  saveAppointment(appointment: IAppointment) {
    if (appointment.id) {
      this.appointments = [
        ...this.appointments.map(a =>
          a.id === appointment.id ? appointment : a
        ),
      ];
    } else {
      this.appointments = [
        ...this.appointments,
        {
          ...appointment,
          id: uuid(),
        },
      ];
    }
    this.appointmentsSubject.next([...this.appointments]);
  }

  removeAppointment(appointment: IAppointment) {
    this.appointments = [
      ...this.appointments.filter(a => a.id !== appointment.id),
    ];
    this.appointmentsSubject.next([...this.appointments]);
  }
}
