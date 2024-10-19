import { Task } from '../interfaces/Task';

export const getTimeIn24HourFormat = (task: Task) => {
  const [hours, minutes] = task.scheduledTime.split(':').map(Number);
  let adjustedHours = hours;
  if (task.timeType === 'PM' && hours < 12) adjustedHours += 12;
  if (task.timeType === 'AM' && hours === 12) adjustedHours = 0;
  return adjustedHours * 60 + minutes;
};
