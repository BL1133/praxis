'use client';
import useSWR from 'swr';
import { GetProjectsResponse } from 'types';

import { fetcher } from '@/utils/fetcher';

export const useProjects = (
  initialData: GetProjectsResponse,
  query: string,
) => {
  let url;
  if (query !== '') {
    url = `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects${query}}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`;
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
