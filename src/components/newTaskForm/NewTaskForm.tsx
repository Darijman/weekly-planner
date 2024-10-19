import { FormEvent, useState } from 'react';
import { Task } from '../../interfaces/Task';
import { nanoid } from 'nanoid';
import { useWeeksStore } from '../../stores/useWeeksStore/useWeeksStore';
import { Week } from '../../interfaces/Week';
import { getTimeIn24HourFormat } from '../weekGrid/WeekGrid';
import './newTaskForm.css';

interface Props {
  weekDay: keyof Week['days'];
  setSortedTasks: (sortedTasks: Task[]) => void;
  sortedTasks: Task[];
  setShowNewTaskForm: (showNewTaskForm: boolean) => void;
}

export const NewTaskForm = ({ weekDay, setSortedTasks, sortedTasks, setShowNewTaskForm }: Props) => {
  const { addTaskToDay } = useWeeksStore();
  const [newTask, setNewTask] = useState<Task>({
    id: nanoid(),
    title: '',
    scheduledTime: '',
    timeType: 'PM',
    finished: false,
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

  const addNewTaskConfirmHandler = (event: FormEvent) => {
    event.preventDefault();
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

    setShowNewTaskForm(false);
    setSortedTasks(updatedSortedTasks);

    setNewTask({
      id: nanoid(),
      title: '',
      scheduledTime: '',
      timeType: 'PM',
      finished: false,
    });
  };

  const timeType = Number(newTask.scheduledTime.slice(0, 2)) < 12 ? ':AM' : ':PM';
  const confirmButtonDisabled = !newTask.title.trim() || !newTask.scheduledTime.trim();

  return (
    <div>
      <form>
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
            <button type='submit' className='new_task_confirm_button' disabled={confirmButtonDisabled} onClick={addNewTaskConfirmHandler}>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
