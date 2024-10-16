import { Task } from './Task';

export interface Table {
  id: string;
  tasks: Task[];
  weekStartDate: Date;
  weekEndDate: Date;
}
