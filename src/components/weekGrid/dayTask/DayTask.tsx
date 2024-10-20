import { useState } from 'react';
import { Task } from '../../../interfaces/Task';
import { useThemeStore } from '../../../stores/useThemeStore/useThemeStore';
import { useWeeksStore } from '../../../stores/useWeeksStore/useWeeksStore';
import { EditTaskForm } from '../../editTaskForm/EditTaskForm';
import { Modal } from '../../../ui/modal/Modal';
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

  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteTaskHandler = (taskId: string) => {
    deleteTask(taskId);

    const newTasks = sortedTasks.filter((task) => task.id !== taskId);
    setSortedTasks(newTasks);
    setShowModal(false);
  };

  const finishTaskHandler = (taskId: string) => {
    finishTask(taskId);

    const updatedTasks = sortedTasks.map((task) => (task.id === taskId ? { ...task, finished: !task.finished } : task));
    setSortedTasks(updatedTasks);
  };

  return (
    <>
      {showEditForm ? (
        <EditTaskForm
          task={task}
          setSortedTasks={setSortedTasks}
          sortedTasks={sortedTasks}
          setShowEditForm={setShowEditForm}
          showEditForm={showEditForm}
        />
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
            <button title='Delete' onClick={() => setShowModal(true)} className={`delete_button ${isDark ? 'dark-mode' : 'light-mode'}`} />
          </div>
        </div>
      )}
      <Modal
        title='Do you really wanna delete this task?'
        onYes={() => deleteTaskHandler(id)}
        onNo={() => setShowModal(false)}
        showModal={showModal}
      />
    </>
  );
};
