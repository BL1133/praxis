'use client';
import { Project } from '@payloadTypes';
import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

// This can be used to fetch data for a project
// The way its set up with SWR is that SWR uses this as fallback data

export const useProject = (initialData: Project) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${initialData.id}`,
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
    mutate,
  };
};
