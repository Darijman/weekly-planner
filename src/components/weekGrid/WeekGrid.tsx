import { Task } from '../../interfaces/Task';
import { Week } from '../../interfaces/Week';
import { useWeeksStore } from '../../stores/useWeeksStore/useWeeksStore';
import { WeekDay } from './weekDay/WeekDay';
import './weekGrid.css';

export const getTimeIn24HourFormat = (task: Task) => {
  const [hours, minutes] = task.scheduledTime.split(':').map(Number);
  let adjustedHours = hours;
  if (task.timeType === 'PM' && hours < 12) adjustedHours += 12;
  if (task.timeType === 'AM' && hours === 12) adjustedHours = 0;
  return adjustedHours * 60 + minutes;
};

export const WeekGrid = () => {
  const { currentWeek } = useWeeksStore();

  const daysArray = Object.entries(currentWeek.days) as [keyof Week['days'], Week['days'][keyof Week['days']]][];

  return (
    <div>
      <h1 className='week_date'>14 Oct - 20 Oct, 2024</h1>
      <div className='week_grid'>
        {daysArray.map(([day, tasks], index) => {
          const sortedTasks = [...tasks].sort((a, b) => getTimeIn24HourFormat(a) - getTimeIn24HourFormat(b));

          if (index === daysArray.length - 1) {
            return (
              <div key={`sunday-${index}`} style={{ gridColumn: 2 }}>
                <WeekDay dayTasks={sortedTasks} weekDay='sunday' />
              </div>
            );
          }
          return <WeekDay key={day} dayTasks={sortedTasks} weekDay={day} />;
        })}
      </div>
    </div>
  );
};
