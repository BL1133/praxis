'use client';

import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

export function AlertWithIcon({ message }: { message: string }) {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span>
        <p>
          <span className="font-medium">Alert! </span>
          {message}
        </p>
      </span>
    </Alert>
  );
}
