import { FormEvent, useState } from 'react';
import { Task } from '../../interfaces/Task';
import { nanoid } from 'nanoid';
import { useWeeksStore } from '../../stores/useWeeksStore/useWeeksStore';
import { getTimeIn24HourFormat } from '../weekGrid/WeekGrid';
import './editTaskForm.css';

interface Props {
  setSortedTasks: (sortedTasks: Task[]) => void;
  sortedTasks: Task[];
  setShowEditForm: (showEditForm: boolean) => void;
  showEditForm: boolean;
  task: Task;
}

export const EditTaskForm = ({ setSortedTasks, sortedTasks, setShowEditForm, showEditForm, task }: Props) => {
  const { editTask } = useWeeksStore();
  const { id, title, scheduledTime, timeType, finished } = task;
  const [newTask, setNewTask] = useState<Task>({
    id: id,
    title: title,
    scheduledTime: scheduledTime,
    timeType: timeType,
    finished: finished,
  });

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

  const editTaskConfirmHandler = (event: FormEvent) => {
    event.preventDefault();

    editTask(id, newTask);

    const remainingTasks = sortedTasks.filter((task) => task.id !== id);
    const newTaskTime = getTimeIn24HourFormat(newTask);

    const insertIndex = remainingTasks.findIndex((task) => {
      const taskTime = getTimeIn24HourFormat(task);
      return newTaskTime < taskTime;
    });

    if (insertIndex !== -1) {
      remainingTasks.splice(insertIndex, 0, newTask);
    } else {
      remainingTasks.push(newTask);
    }

    setSortedTasks(remainingTasks);
    setShowEditForm(false);

    setNewTask({
      id: nanoid(),
      title: '',
      scheduledTime: '',
      timeType: 'PM',
      finished: false,
    });
  };

  const timeTypeShow = Number(newTask.scheduledTime.slice(0, 2)) < 12 ? ':AM' : ':PM';
  const confirmButtonDisabled = !newTask.title.trim() || !newTask.scheduledTime.trim();

  return (
    <div>
      <form>
        <div className='edit_task_top'>
          <div>
            <input
              className='edit_task_time_input'
              placeholder='Time'
              type='time'
              onChange={timeOnChangeHandler}
              value={newTask.scheduledTime}
            />
            <span>{timeTypeShow}</span>
          </div>
          <div>
            <span>Edit</span>
            <button onClick={() => setShowEditForm(!showEditForm)} className='close_task_button'>
              {showEditForm ? '-' : '+'}
            </button>
          </div>
        </div>
        <div className='edit_task_bottom'>
          <input
            className='edit_task_value_input'
            placeholder='Task'
            type='text'
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            value={newTask.title}
          />
          <button type='submit' className='edit_task_confirm_button' disabled={confirmButtonDisabled} onClick={editTaskConfirmHandler}>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};
