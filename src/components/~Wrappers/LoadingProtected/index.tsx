import React from 'react';

import { BadStatusPage } from '@/components/BadStatusPage';
import { Loading } from '@/components/LoadingPage';
import { useUser } from '@/lib/hooks/useUser';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export function LoadingProtected({ children }: LoadingWrapperProps) {
  const { data: userData, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!userData?.user) {
    return <BadStatusPage statusCode={403} />;
  }

  return <>{children}</>;
}
