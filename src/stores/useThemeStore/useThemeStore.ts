import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleDarkMode: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'isDark',
    },
  ),
);
