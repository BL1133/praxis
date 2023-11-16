/**
 * @fileoverview Catches client and server side errors. Client side is React error boundary where you can retry to render the component again. Server side passes the error as a prop.
 * @param error - The error object with an optional digest property.
 * @param reset - A function to reset the component.
 * @returns A React component.
 */
'use client';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Error components must be Client Componentsx

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   // console.error('error');
  // }, [error]);

  return <ErrorBoundary error={error} reset={reset} />;
}
