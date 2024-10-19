export interface Task {
  id: string;
  title: string;
  scheduledTime: string;
  timeType: 'PM' | 'AM';
  finished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
