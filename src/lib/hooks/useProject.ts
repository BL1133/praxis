'use client';
import { Project } from '@payloadTypes';
import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

export const useProject = (initialData: Project) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${initialData.id}`,
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 120000, // 2 minutes
    },
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
};