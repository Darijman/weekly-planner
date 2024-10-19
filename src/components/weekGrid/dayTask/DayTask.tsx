import { useState } from 'react';
import { Task } from '../../../interfaces/Task';
import { useThemeStore } from '../../../stores/useThemeStore/useThemeStore';
import { useWeeksStore } from '../../../stores/useWeeksStore/useWeeksStore';
import './dayTask.css';

interface Props {
  task: Task;
  setSortedTasks: (tasks: Task[]) => void;
  sortedTasks: Task[];
}

export const DayTask = ({ task, setSortedTasks, sortedTasks }: Props) => {
  const { isDark } = useThemeStore();
  const { deleteTask, finishTask } = useWeeksStore();
  const { id, title, scheduledTime, timeType } = task;

  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const deleteTaskHandler = (taskId: string) => {
    deleteTask(taskId);

    const newTasks = sortedTasks.filter((task) => task.id !== taskId);
    setSortedTasks(newTasks);
  };

  const finishTaskHandler = (taskId: string) => {
    finishTask(taskId);

    const updatedTasks = sortedTasks.map((task) => (task.id === taskId ? { ...task, finished: !task.finished } : task));
    setSortedTasks(updatedTasks);
  };

  return (
    <>
      {showEditForm ? (
        <div>
          <input
            className='new_task_time_input'
            placeholder='Time'
            type='time'
            // onChange={timeOnChangeHandler}
            // value={newTask.scheduledTime}
          />
          <span>{timeType}</span>
          <div className='new_task_bottom'>
            <input
              className='new_task_value_input'
              placeholder='Task'
              type='text'
              // onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              // value={newTask.title}
            />
            <button className='new_task_confirm_button'>Confirm</button>
          </div>
        </div>
      ) : (
        <div className='day_task'>
          <div className='task_info'>
            <input type='checkbox' className='task_checkbox' onChange={() => finishTaskHandler(id)} checked={task.finished} />
            <span className='task_title'>
              {scheduledTime + timeType}: {title}
            </span>
          </div>
          <div className='task_buttons'>
            <button
              title='Edit'
              onClick={() => setShowEditForm(!showEditForm)}
              className={`edit_button ${isDark ? 'dark-mode' : 'light-mode'}`}
            />
            <button title='Delete' onClick={() => deleteTaskHandler(id)} className={`delete_button ${isDark ? 'dark-mode' : 'light-mode'}`} />
          </div>
        </div>
      )}
    </>
  );
};
