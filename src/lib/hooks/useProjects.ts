'use client';
import useSWR from 'swr';
import { GetProjectsResponse } from 'types';

import { fetcher } from '@/utils/fetcher';

export const useProjects = (
  initialData: GetProjectsResponse,
  query: string,
) => {
  let url = `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`;
  if (query !== '') {
    url += query; // Append the query string directly
  }

  const { data, error, isLoading } = useSWR(url, fetcher, {
    fallbackData: initialData,
    refreshInterval: 60000, // 1 minute
  });

  return {
    data,
    isLoading,
    isError: error,
  };
};
