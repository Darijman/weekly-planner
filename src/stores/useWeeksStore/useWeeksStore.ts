import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Week } from '../../interfaces/Week';
import { Task } from '../../interfaces/Task';

const getCurrentWeekDates = () => {
  const today = new Date();
  const firstDay = today.getDate() - today.getDay() + 1; // Adjusted to start on Monday
  const lastDay = firstDay + 6;

  const weekStartDate = new Date(today.setDate(firstDay));
  const weekEndDate = new Date(today.setDate(lastDay));

  return { weekStartDate, weekEndDate };
};

const { weekStartDate, weekEndDate } = getCurrentWeekDates();

interface WeeksState {
  weeks: Week[];
  currentWeek: Week;
  setCurrentWeek: (week: Week) => void;
  deleteWeek: (weekId: string) => void;
  setWeeks: (weeks: Week[]) => void;
  addTaskToDay: (task: Task, day: keyof Week['days']) => void;
  deleteTask: (taskId: string) => void;
  finishTask: (taskId: string) => void;
  editTask: (taskId: string, updatedTask: Task) => void;
}

export const useWeeksStore = create<WeeksState>()(
  persist(
    (set) => ({
      weeks: [
        {
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
          weekEndDate: weekEndDate,
          weekStartDate: weekStartDate,
        },
      ],
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
        weekEndDate: weekEndDate,
        weekStartDate: weekStartDate,
      },
      setCurrentWeek: (week) => set(() => ({ currentWeek: week })),
      deleteWeek: (weekId: string) =>
        set((state) => {
          const weekIndex = state.weeks.findIndex((value) => value.id === weekId);

          const newWeeks = state.weeks.filter((_, index) => index !== weekIndex);

          let newCurrentWeek = state.currentWeek;

          if (weekId === state.currentWeek.id) {
            const nextWeekIndex = weekIndex < newWeeks.length ? weekIndex : newWeeks.length - 1;
            newCurrentWeek = newWeeks[nextWeekIndex] || {
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
            };
          }

          return {
            weeks: newWeeks,
            currentWeek: newCurrentWeek,
          };
        }),

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
