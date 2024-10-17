import { Task } from '../../../interfaces/Task';
import { useThemeStore } from '../../../stores/useThemeStore/useThemeStore';
import './dayTask.css';

export const DayTask = ({ task }: { task: Task }) => {
  const { isDark } = useThemeStore();
  const { id, title, scheduledTime, finished, createdAt, updatedAt } = task;

  return (
    <div className='day_task'>
      <div className='task_info'>
        <input type='checkbox' className='task_checkbox' />
        <span className='task_title'>
          {scheduledTime}: {title}
        </span>
      </div>
      <div className='task_buttons'>
        <button title='Edit' className={`edit_button ${isDark ? 'dark-mode' : 'light-mode'}`} />
        <button title='Delete' className={`delete_button ${isDark ? 'dark-mode' : 'light-mode'}`} />
      </div>
    </div>
  );
};
