export interface Task {
  id: string;
  title: string;
  scheduledTime: string;
  finished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
