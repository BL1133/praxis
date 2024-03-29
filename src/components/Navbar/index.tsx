'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import React from 'react';
import { HiBell, HiLogout, HiViewGrid } from 'react-icons/hi';
import { IoCreateOutline, IoGridOutline } from 'react-icons/io5';

import { useUser } from '@/lib/hooks/useUser';
import { useSidebarContext } from '@/providers/SidebarContext';

const Nav: FC = function () {
  const { isOpen, isPageWithSidebar, setOpen } = useSidebarContext();
  const { data, isLoading, isError, logout } = useUser();
  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';

    // Set the cookie based on the toggled theme
    if (currentTheme === 'dark') {
      document.cookie = 'theme=dark; path=/; max-age=31536000'; // Set for one year
    } else {
      document.cookie = 'theme=light; path=/; max-age=31536000'; // Set for one year
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Check if the key pressed is 'Enter'
    if (event.key === 'Enter') {
      handleThemeToggle();
    }
  };

  const handleSetOpen = () => {
    const newIsOpen = !isOpen;
    setOpen(!isOpen);
    window.localStorage.setItem('isSidebarOpen', newIsOpen.toString());
  };

  return (
    // Have to set z-index on this element because it's not working in the root stylesheet flowbite-theme. It doesn't compute it.
    <Navbar fluid style={{ zIndex: 30 }}>
      <div className="w-full p-3 lg:px-5 lg:pl-3 navbar">
        <div className="flex items-center justify-between h-11">
          <div className="flex items-center">
            {/* {isPageWithSidebar && (
              <button
                onClick={handleSetOpen}
                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <span className="sr-only">Toggle sidebar</span>
                {isOpen && isSmallScreen() ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
            )} */}
            <Navbar.Brand as={Link as any} href="/">
              <span className="self-center text-cyan-600 whitespace-nowrap text-2xl font-semibold dark:text-white ml-2">
                praxis
              </span>
            </Navbar.Brand>
            <Link
              href={'/projects'}
              className="ml-8 text-gray-500 p-2 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 inline-block"
            >
              <p
                className="text-md font-semibold mt-0.5 text-cyan-600 dark:text-white"
                style={{ transform: 'translateY(2px)' }}
              >
                Projects
              </p>
            </Link>
          </div>
          {!data?.user && (
            <div style={{ transform: 'translateY(3px)' }}>
              <Link
                className="pr-2 sm:pr-3 text-cyan-600 text-sm sm:text-md md:text-lg"
                href="/signup"
              >
                Sign Up{' '}
              </Link>
              <Link
                className="text-cyan-600 text-sm sm:text-md md:text-lg"
                href="/login"
              >
                Log in{' '}
              </Link>
            </div>
          )}

          {data?.user && (
            <div className="flex items-center lg:gap-3">
              <div className="flex items-center">
                {/* <NotificationBellDropdown /> */}
                <AppDrawerDropdown />
                <div
                  onClick={handleThemeToggle}
                  tabIndex={0}
                  role="button"
                  onKeyDown={handleKeyDown}
                >
                  <DarkThemeToggle />
                </div>
              </div>
              <div className="hidden lg:block">
                <UserDropdown />
              </div>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
};

const NotificationBellDropdown: FC = function () {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Notifications</span>
          <HiBell className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
        </span>
      }
      // fixes strange bug that won't compute the border radius from theme file
      className="rounded-xl"
    >
      <div className="max-w-[24rem]">
        <div className="block rounded-t-xl bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          Notifications
        </div>
      </div>
    </Dropdown>
  );
};

const NewMessageIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
    </svg>
  );
};

const NewFollowIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
    </svg>
  );
};

const NewLoveIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const NewMentionIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const NewVideoIcon: FC = function () {
  return (
    <svg
      className="h-3 w-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
    </svg>
  );
};

const AppDrawerDropdown: FC = function () {
  const router = useRouter();
  const { data, logout } = useUser();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      // You can display a message or perform additional logic after a successful logout, if desired
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <Dropdown
      arrowIcon={false}
      inline
      dismissOnClick={true}
      label={
        <span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="sr-only">Apps</span>
          <HiViewGrid className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </span>
      }
      // fixes strange bug that won't compute the border radius from theme file
      className="rounded-xl"
    >
      <div className="block rounded-t-lg border-b bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:border-b-gray-600 dark:bg-gray-700 dark:text-white">
        Navigation
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Dropdown.Item className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <Link href="/projects" className="">
            <IoGridOutline className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
            <div className="text-sm font-medium text-gray-500 dark:text-white">
              Projects
            </div>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600">
          <Link href="/projects/create">
            <IoCreateOutline className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
            <div className="text-sm font-medium text-gray-500 dark:text-white">
              Create
            </div>
          </Link>
        </Dropdown.Item>

        <button
          onClick={handleLogout}
          className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <HiLogout className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
          <div className="text-sm font-medium text-gray-500 dark:text-white">
            Logout
          </div>
        </button>
      </div>
    </Dropdown>
  );
};

const UserDropdown: FC = function () {
  const { data, logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      // You can display a message or perform additional logic after a successful logout, if desired
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">User menu</span>
          <Avatar alt="" rounded size="sm" />
        </span>
      }
      // fixes strange bug that won't compute the border radius from theme file
      className="rounded-xl"
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {`${data?.user?.firstName || ''} ${
            data?.user?.lastName || ''
          }`.trim()}
        </span>
        <span className="block truncate text-sm font-medium">
          {data?.user?.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item
        onClick={handleLogout}
        className="rounded-bl-xl rounded-br-xl"
      >
        Logout
      </Dropdown.Item>
    </Dropdown>
  );
};

export default Nav;
