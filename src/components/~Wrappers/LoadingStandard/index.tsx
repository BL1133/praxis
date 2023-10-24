import React from 'react';

import { Loading } from '@/components/LoadingPage';
import { useUser } from '@/lib/hooks/useUser';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export function LoadingStandard({ children }: LoadingWrapperProps) {
  const { isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
