import { useEffect, useState } from 'react';
import { Task } from '../../../interfaces/Task';
import { DayTask } from '../dayTask/DayTask';
import { Week } from '../../../interfaces/Week';
import { useThemeStore } from '../../../stores/useThemeStore/useThemeStore';
import { getTimeIn24HourFormat } from '../../../helpFunctions/getTimeIn24HourFormat';
import { NewTaskForm } from '../../newTaskForm/NewTaskForm';
import './weekDay.css';

export const WeekDay = ({ dayTasks, weekDay }: { dayTasks: Task[]; weekDay: keyof Week['days'] }) => {
  const { isDark } = useThemeStore();

  const [showNewTaskForm, setShowNewTaskForm] = useState<boolean>(false);

  const [sortedTasks, setSortedTasks] = useState<Task[]>(dayTasks);
  const [sortBy, setSortBy] = useState<'SCHEDULEDTIME' | 'FINISHED'>('FINISHED');

  useEffect(() => {
    setSortedTasks([...dayTasks]);
  }, [dayTasks]);

  const sortHandler = () => {
    const sorted = [...dayTasks].sort((a, b) => {
      if (sortBy === 'SCHEDULEDTIME') {
        return getTimeIn24HourFormat(a) - getTimeIn24HourFormat(b);
      } else if (sortBy === 'FINISHED') {
        return Number(b.finished) - Number(a.finished);
      }

      return 0;
    });

    setSortedTasks(sorted);
    setSortBy((prev) => (prev === 'SCHEDULEDTIME' ? 'FINISHED' : 'SCHEDULEDTIME'));
  };

  const sortButtonDisabled = dayTasks.length < 2 || dayTasks.every((elem) => elem.finished);

  return (
    <div className='week_day'>
      <div className='day_top'>
        <button className={`sort_button ${isDark ? 'dark-mode' : 'light-mode'}`} disabled={sortButtonDisabled} onClick={sortHandler} />
        <h3 className='day_title'>{weekDay}</h3>
        <button onClick={() => setShowNewTaskForm(!showNewTaskForm)} className='add_task_button'>
          {showNewTaskForm ? '-' : '+'}
        </button>
      </div>
      <div>
        {showNewTaskForm ? (
          <NewTaskForm setSortedTasks={setSortedTasks} sortedTasks={sortedTasks} weekDay={weekDay} setShowNewTaskForm={setShowNewTaskForm} />
        ) : null}
        {sortedTasks.map((task) => {
          return <DayTask key={task.id} task={task} sortedTasks={sortedTasks} setSortedTasks={setSortedTasks} />;
        })}
      </div>
    </div>
  );
};
