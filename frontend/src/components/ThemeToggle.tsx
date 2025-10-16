import React, { useEffect, useState } from 'react';
import { Button } from './ui/Button';

const STORAGE_KEY = 'theme';

export const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState<boolean>(() => {
    // Prefer saved theme, else match media, default dark
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light') return false;
    if (saved === 'dark') return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  // Apply on mount and when toggled
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove('light');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.classList.add('light');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
  }, [dark]);
  return <Button variant="ghost" size="sm" aria-label="Toggle theme" onClick={() => setDark(d => !d)}>{dark ? '🌙' : '☀️'}</Button>;
};
