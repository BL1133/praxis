import { Spinner } from 'flowbite-react';

export function Loading() {
  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen mt-[-68px]">
      <Spinner aria-label="spinner" size="xl" />
    </div>
  );
}
