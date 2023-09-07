'use client';
import useSWR from 'swr';
import { ProjectResponse } from 'types';

import { fetcher } from '@/utils/fetcher';

export const useProjects = (initialData: ProjectResponse) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`,
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 60000, // 1 minute
    },
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};
