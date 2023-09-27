import type { CustomFlowbiteTheme } from 'flowbite-react';
/**
The file you're looking at is a theme configuration file for Flowbite. It's defining a custom theme that you can use throughout your application. The theme is an object that specifies various styles for different components like badges, buttons, dropdowns, modals, etc.

Here's a breakdown of what some of the properties do:

- `badge`: Styles for badge components.
- `button`: Styles for button components.
- `dropdown`: Styles for dropdown components.
- `modal`: Styles for modal components.
- `navbar`: Styles for the navigation bar.
- `sidebar`: Styles for the sidebar.
- `textarea`: Styles for textarea components.
- `textInput`: Styles for text input components.
- `toggleSwitch`: Styles for toggle switch components.

Each of these properties has nested properties that further define the styles for different states, sizes, and variations of the components.

For example, under `button`, you have:

- `color`: Defines the text and background color for different types of buttons (gray, info, primary).
- `inner`: Defines the base styles for the inner part of the button.

You can customize this file to match the look and feel you want for your application. Once you've defined your theme, you can pass it to the `Flowbite` component as a prop, and it will apply these styles globally.

If you're not familiar with Flowbite, you might want to check their documentation to understand how to use these theme configurations effectively.
*/
const flowbiteTheme: CustomFlowbiteTheme = {
  badge: {
    root: {
      color: {
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300',
        primary:
          'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-300',
      },
      size: {
        xl: 'px-3 py-2 text-base rounded-md',
      },
    },
    icon: {
      off: 'rounded-full px-2 py-1',
    },
  },
  button: {
    color: {
      gray: 'text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-blue-700 :ring-blue-700 focus:text-blue-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2',
      info: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
      primary:
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    },
    inner: {
      base: 'flex items-center transition-all duration-200',
    },
    outline: {
      color: {
        gray: 'border border-gray-200 dark:border-gray-500',
      },
    },
  },
  dropdown: {
    floating: {
      base: 'z-10 w-fit rounded-xl divide-y divide-gray-100 shadow',
      content: 'rounded-xl text-sm text-gray-700 dark:text-gray-200',
      target: 'w-fit dark:text-white',
    },
    content: '',
  },
  modal: {
    content: {
      inner: 'relative rounded-lg bg-white shadow dark:bg-gray-800',
    },
    header: {
      base: 'flex items-start justify-between rounded-t px-5 pt-5',
    },
  },
  navbar: {
    root: {
      base: 'fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    },
  },
  sidebar: {
    root: {
      base: 'flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 h-full duration-75 border-r border-gray-200 lg:flex transition-width dark:border-gray-700',
    },
    item: {
      base: 'flex items-center justify-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
    },
    collapse: {
      button:
        'group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
    },
  },
  textarea: {
    base: 'block w-full text-sm p-4 rounded-lg border disabled:cursor-not-allowed disabled:opacity-50',
  },
  textInput: {
    field: {
      input: {
        colors: {
          info: 'border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500',
        },
        withIcon: {
          on: '!pl-12',
        },
      },
    },
  },
  toggleSwitch: {
    toggle: {
      checked: {
        color: {
          blue: 'bg-blue-700 border-blue-700',
        },
      },
    },
  },
};

export default flowbiteTheme;
