import { Task } from '../../../interfaces/Task';
import { DayTask } from '../dayTask/DayTask';
import './weekDay.css';

export const WeekDay = ({ dayTasks, weekDay }: { dayTasks: Task[]; weekDay: string }) => {
  return (
    <div className='week_day'>
      <div className='day_top'>
        <h3 className='day_title'>{weekDay}</h3>
        <button className='add_task_button'>+</button>
      </div>
      <div>
        {dayTasks.map((task) => {
          return <DayTask key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};
