'use client';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import isBrowser from '@/utils/is-browser';
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
  const pathname = usePathname();
  // Initialize isOpen as false and then update based on localstorage.
  const [isOpen, setOpen] = useState(false);
  const [isPageWithSidebar, setIsPageWithSidebar] = useState(false);
  // Update isOpen based on localStorage after initial render
  useEffect(() => {
    const storedIsOpen = localStorage.getItem('isSidebarOpen');
    if (storedIsOpen !== null) {
      setOpen(JSON.parse(storedIsOpen));
    }
  }, []);

  // Close Sidebar on mobile tap inside main content
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen]);

  // Effect to update isPageWithSidebar based on pathname
  useEffect(() => {
    const projectPageRegex = /^\/projects\/[0-9a-f]+$/;
    if (isBrowser()) {
      setIsPageWithSidebar(projectPageRegex.test(pathname));
    }
  }, [pathname]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isPageWithSidebar,
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
