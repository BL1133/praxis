'use client';
import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import isBrowser from '@/utils/is-browser';
import isSmallScreen from '@/utils/is-small-screen';

interface SidebarContextProps {
  isOpen: boolean;
  isPageWithSidebar: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (isOpen: boolean) => void;
}

const SidebarContext = createContext({} as SidebarContextProps);

export function SidebarProvider({ children }: PropsWithChildren) {
  const location = isBrowser() ? window.location.pathname : '/';
  const [isOpen, setOpen] = useState(
    isBrowser()
      ? window.localStorage.getItem('isSidebarOpen') === 'true'
      : false,
  );
  console.log('isOpen', isOpen);
  // Save latest state to localStorage
  // useEffect(() => {
  //   console.log('isOpen state changed', isOpen);
  //   window.localStorage.setItem('isSidebarOpen', isOpen.toString());
  // }, [isOpen]);

  // Close Sidebar on page change on mobile
  useEffect(() => {
    if (isSmallScreen()) {
      setOpen(false);
    }
  }, [location]);

  // Close Sidebar on mobile tap inside main content
  useEffect(() => {
    function handleMobileTapInsideMain(event: MouseEvent) {
      const main = document.querySelector('main');
      const isClickInsideMain = main?.contains(event.target as Node);

      if (isSmallScreen() && isClickInsideMain) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleMobileTapInsideMain);
    return () => {
      document.removeEventListener('mousedown', handleMobileTapInsideMain);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isPageWithSidebar: true,
        setOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext(): SidebarContextProps {
  const context = useContext(SidebarContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useSidebarContext should be used within the SidebarContext provider!',
    );
  }

  return context;
}
