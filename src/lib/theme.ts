import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  setDark: (v: boolean) => void;
}

export const useTheme = create<ThemeStore>((set) => {
  const stored = localStorage.getItem('inkmind-theme');
  const isDark = stored ? stored === 'dark' : true; // dark-mode-first
  if (isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');

  return {
    isDark,
    toggle: () => set((s) => {
      const next = !s.isDark;
      localStorage.setItem('inkmind-theme', next ? 'dark' : 'light');
      if (next) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return { isDark: next };
    }),
    setDark: (v) => set(() => {
      localStorage.setItem('inkmind-theme', v ? 'dark' : 'light');
      if (v) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return { isDark: v };
    }),
  };
});
