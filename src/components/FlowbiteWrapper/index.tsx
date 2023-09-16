'use client';
import { Flowbite, useThemeMode } from 'flowbite-react';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

import theme from '@/flowbite-theme';
import isBrowser from '@/utils/is-browser';

const FlowbiteWrapper = function ({ children }: { children: ReactNode }) {
  // Check if window is defined before accessing localStorage
  const dark = isBrowser() ? localStorage.getItem('theme') === 'dark' : false;

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
    // Check if window is defined before accessing localStorage
    isBrowser() && localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  return <></>;
};

export default FlowbiteWrapper;
