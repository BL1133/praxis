'use client';
import { Flowbite, useThemeMode } from 'flowbite-react';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

import theme from '@/flowbite-theme';

const FlowbiteWrapper = function ({ children }: { children: ReactNode }) {
  const dark = localStorage.getItem('theme') === 'dark';

  return (
    <Flowbite theme={{ dark, theme }}>
      <PersistFlowbiteThemeToLocalStorage />
      {children}
    </Flowbite>
  );
};

const PersistFlowbiteThemeToLocalStorage: FC = function () {
  const [themeMode] = useThemeMode();

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  return <></>;
};

export default FlowbiteWrapper;
