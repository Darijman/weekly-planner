import { Task } from './Task';

export interface Week {
  id: string;
  days: {
    monday: Task[];
    tuesday: Task[];
    wednesday: Task[];
    thursday: Task[];
    friday: Task[];
    saturday: Task[];
    sunday: Task[];
  };
  weekStartDate: Date;
  weekEndDate: Date;
}
