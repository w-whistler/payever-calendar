import { ITimeRange } from './time-range.model';

export interface IAppointment {
  id?: string;
  timeRange: ITimeRange;
  title: string;
  isDraft?: boolean;
}
