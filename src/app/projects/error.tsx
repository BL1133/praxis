/**
 * @fileoverview Catches client and server side errors. Client side is React error boundary where you can retry to render the component again. Server side passes the error as a prop.
 * @param error - The error object with an optional digest property.
 * @param reset - A function to reset the component.
 * @returns A React component.
 */
'use client'; // Error components must be Client Componentsx

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error('error');
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
