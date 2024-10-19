import { useState } from 'react';
import { Task } from '../../../interfaces/Task';
import { useWeeksStore } from '../../../stores/useWeeksStore/useWeeksStore';
import { DayTask } from '../dayTask/DayTask';
import { Week } from '../../../interfaces/Week';
import { nanoid } from 'nanoid';
import { useThemeStore } from '../../../stores/useThemeStore/useThemeStore';
import { getTimeIn24HourFormat } from '../WeekGrid';
import './weekDay.css';

export const WeekDay = ({ dayTasks, weekDay }: { dayTasks: Task[]; weekDay: keyof Week['days'] }) => {
  const { addTaskToDay } = useWeeksStore();
  const { isDark } = useThemeStore();

  const [newTask, setNewTask] = useState<Task>({
    id: nanoid(),
    title: '',
    scheduledTime: '',
    timeType: 'PM',
    finished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);

  const [sortedTasks, setSortedTasks] = useState<Task[]>(dayTasks);
  const [sortBy, setSortBy] = useState<'SCHEDULEDTIME' | 'FINISHED'>('FINISHED');

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

  const timeOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    const hours = Number(time.slice(0, 2));

    const newTimeType = hours < 12 ? 'AM' : 'PM';

    setNewTask((prevTask) => ({
      ...prevTask,
      scheduledTime: time,
      timeType: newTimeType,
    }));
  };
  const addNewTaskConfirmHandler = () => {
    addTaskToDay(newTask, weekDay);

    const newTaskTime = getTimeIn24HourFormat(newTask);
    const updatedSortedTasks = [...sortedTasks];

    const insertIndex = updatedSortedTasks.findIndex((task) => {
      const taskTime = getTimeIn24HourFormat(task);
      return newTaskTime < taskTime;
    });

    if (insertIndex !== -1) {
      updatedSortedTasks.splice(insertIndex, 0, newTask);
    } else {
      updatedSortedTasks.push(newTask);
    }

    setSortedTasks(updatedSortedTasks);
    setShowNewTaskInput(false);

    setNewTask({
      id: nanoid(),
      title: '',
      scheduledTime: '',
      timeType: 'PM',
      finished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const confirmButtonDisabled = !newTask.title.trim() || !newTask.scheduledTime.trim();
  const sortButtonDisabled = dayTasks.length < 2 || dayTasks.every((elem) => elem.finished);
  const timeType = Number(newTask.scheduledTime.slice(0, 2)) < 12 ? ':AM' : ':PM';

  return (
    <div className='week_day'>
      <div className='day_top'>
        <button className={`sort_button ${isDark ? 'dark-mode' : 'light-mode'}`} disabled={sortButtonDisabled} onClick={sortHandler} />
        <h3 className='day_title'>{weekDay}</h3>
        <button onClick={() => setShowNewTaskInput(!showNewTaskInput)} className='add_task_button'>
          {showNewTaskInput ? '-' : '+'}
        </button>
      </div>
      <div>
        {showNewTaskInput ? (
          <div>
            <input
              className='new_task_time_input'
              placeholder='Time'
              type='time'
              onChange={timeOnChangeHandler}
              value={newTask.scheduledTime}
            />
            <span>{timeType}</span>
            <div className='new_task_bottom'>
              <input
                className='new_task_value_input'
                placeholder='Task'
                type='text'
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                value={newTask.title}
              />
              <button className='new_task_confirm_button' disabled={confirmButtonDisabled} onClick={addNewTaskConfirmHandler}>
                Confirm
              </button>
            </div>
          </div>
        ) : null}
        {sortedTasks.map((task) => {
          return <DayTask key={task.id} task={task} sortedTasks={sortedTasks} setSortedTasks={setSortedTasks} />;
        })}
      </div>
    </div>
  );
};
