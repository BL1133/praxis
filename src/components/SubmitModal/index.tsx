import { Spinner } from 'flowbite-react';
import { FieldErrors } from 'react-hook-form';
import { Inputs } from 'types';

interface SubmitModalProps {
  success: boolean | null;
  loading: boolean;
  errors: FieldErrors<Inputs>;
  message: string;
  redirect: string;
}

export function SubmitModal({
  success,
  loading,
  errors,
  message,
}: SubmitModalProps) {
  return (
    <div
      id="submitModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`
      // TODO: Add errors to conditional
      ${loading || success ? '' : 'hidden'}
       overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center`}
    >
      <div className="relative w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-6">
          {loading && (
            <div>
              <div className="mb-3">
                <Spinner />
              </div>
              {/* Assuming this is the loading spinner from flowbite-react */}
              <p>Loading...</p>
            </div>
          )}

          {success && (
            <>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-2.5">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Success</span>
              </div>
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Success!
              </p>
              <p className="mb-6 text-sm text-gray-900 dark:text-white">
                {message}
              </p>
              <Spinner />
              <span className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-60 dark:focus:ring-primary-900">
                Redirecting...
              </span>
            </>
          )}

          {/* {errors && (
            <div>
              <p className="text-red-500">errors</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
