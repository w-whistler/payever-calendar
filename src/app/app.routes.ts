import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './common/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then(m => m.CalendarModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'calendar',
      },
    ],
  },
];
