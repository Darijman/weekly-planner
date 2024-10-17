import { Task } from '../../interfaces/Task';
import { Table } from '../../interfaces/Table';
import { WeekDay } from './weekDay/WeekDay';
import './weekGrid.css';

const task = {
  id: '1',
  title: 'Do the math',
  scheduledTime: '12:50PM',
  finished: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const WeekGrid = () => {
  return (
    <div>
      <h1 className='week_date'>Date</h1>
      <div className='week_grid'>
        <WeekDay dayTasks={[task, task]} weekDay='Monday' />
        <WeekDay dayTasks={[task]} weekDay='Tuesday' />
        <WeekDay dayTasks={[task]} weekDay='Wednesday' />
        <WeekDay dayTasks={[task]} weekDay='Thursday' />
        <WeekDay dayTasks={[task]} weekDay='Friday' />
        <WeekDay dayTasks={[task]} weekDay='Saturday' />
        <WeekDay dayTasks={[task]} weekDay='Sunday' />
      </div>
    </div>
  );
};
