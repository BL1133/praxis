'use client';
import useSWR from 'swr';
import { ProjectResponse } from 'types';

import { fetcher } from '@/utils/fetcher';

export const useProjects = (initialData: ProjectResponse) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`,
    fetcher,
    { fallbackData: initialData, refreshInterval: 60 },
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};
