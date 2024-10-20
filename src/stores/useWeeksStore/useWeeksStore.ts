import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Week } from '../../interfaces/Week';
import { Task } from '../../interfaces/Task';

interface WeeksState {
  weeks: Week[];
  currentWeek: Week;
  setCurrentWeek: (week: Week) => void;
  setWeeks: (weeks: Week[]) => void;
  addTaskToDay: (task: Task, day: keyof Week['days']) => void;
  deleteTask: (taskId: string) => void;
  finishTask: (taskId: string) => void;
  editTask: (taskId: string, updatedTask: Task) => void;
}

export const useWeeksStore = create<WeeksState>()(
  persist(
    (set) => ({
      weeks: [],
      currentWeek: {
        id: '',
        days: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
        weekEndDate: new Date(),
        weekStartDate: new Date(),
      },
      setCurrentWeek: (week) => set(() => ({ currentWeek: week })),
      setWeeks: (weeks) => set(() => ({ weeks })),
      addTaskToDay: (task, day) =>
        set((state) => ({
          currentWeek: {
            ...state.currentWeek,
            days: {
              ...state.currentWeek.days,
              [day]: [...state.currentWeek.days[day], task],
            },
          },
        })),
      deleteTask: (taskId: string) =>
        set((state) => {
          const updatedDays: Week['days'] = Object.fromEntries(
            Object.entries(state.currentWeek.days).map(([day, tasks]) => [
              day as keyof Week['days'],
              tasks.filter((task) => task.id !== taskId),
            ]),
          ) as Week['days'];

          const updatedCurrentWeek = {
            ...state.currentWeek,
            days: updatedDays,
          };

          const updatedWeeks = state.weeks.map((week) => (week.id === state.currentWeek.id ? updatedCurrentWeek : week));

          return {
            currentWeek: updatedCurrentWeek,
            weeks: updatedWeeks,
          };
        }),
      finishTask: (taskId: string) =>
        set((state) => {
          const updatedDays: Week['days'] = { ...state.currentWeek.days };

          for (const day of Object.keys(updatedDays) as (keyof Week['days'])[]) {
            updatedDays[day] = updatedDays[day].map((task) => (task.id === taskId ? { ...task, finished: !task.finished } : task));
          }

          const updatedCurrentWeek = {
            ...state.currentWeek,
            days: updatedDays,
          };

          const updatedWeeks = state.weeks.map((week) => (week.id === state.currentWeek.id ? updatedCurrentWeek : week));

          return {
            currentWeek: updatedCurrentWeek,
            weeks: updatedWeeks,
          };
        }),
      editTask: (taskId: string, updatedTask: Partial<Task>) =>
        set((state) => {
          const updatedDays: Week['days'] = { ...state.currentWeek.days };

          for (const day of Object.keys(updatedDays) as (keyof Week['days'])[]) {
            updatedDays[day] = updatedDays[day].map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task));
          }

          return {
            currentWeek: {
              ...state.currentWeek,
              days: updatedDays,
            },
          };
        }),
    }),
    {
      name: 'weeks-store',
    },
  ),
);
