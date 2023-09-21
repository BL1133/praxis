'use client';
import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

// import isBrowser from '@/utils/is-browser';
import isSmallScreen from '@/utils/is-small-screen';

interface SidebarContextProps {
  isOpen: boolean;
  isPageWithSidebar: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (isOpen: boolean) => void;
}

const SidebarContext = createContext({} as SidebarContextProps);

export function SidebarProvider({ children }: PropsWithChildren) {
  // Initialize isOpen based on localStorage or screen size
  const initialIsOpen = () => {
    const storedIsOpen = localStorage.getItem('isSidebarOpen');
    if (storedIsOpen !== null) {
      return JSON.parse(storedIsOpen);
    }
    return isSmallScreen() ? false : true;
  };
  /**
   * If the code is not running in a browser, then isOpen will be false.
   * If the code is running in a browser and the screen is small, then isOpen will be false.
   * If the code is running in a browser and the screen is not small, then isOpen will be true.
   */
  // const [isOpen, setOpen] = useState(
  //   isBrowser() ? (isSmallScreen() ? false : true) : false,
  // );
  const [isBrowser, setIsBrowser] = useState(false); // New state
  const [isOpen, setOpen] = useState(initialIsOpen); // Initialize to false
  console.log('isOpen', isOpen);

  // Save latest state to localStorage
  useEffect(() => {
    console.log('isOpen state changed', isOpen);
    window.localStorage.setItem('isSidebarOpen', isOpen.toString());
  }, [isOpen]); //TODO: add localStorage

  // Close Sidebar on page change on mobile
  useEffect(() => {
    setIsBrowser(true); // Set isBrowser to true after mount
    setOpen(isSmallScreen() ? false : true); // Set initial value for isOpen
  }, []);

  const location = isBrowser ? window.location.pathname : '/';
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
