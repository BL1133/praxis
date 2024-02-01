'use client';
/**
 * Custom hook for fetching projects data using SWR (stale-while-revalidate).
 * It constructs the URL for the API request based on the provided query string.
 * If a query string is provided, it appends it to the base URL to fetch filtered data.
 * Otherwise, it fetches all projects.
 *
 * @param {GetProjectsResponse} initialData - Initial data to be used as a fallback.
 * @param {string} query - The query string used for filtering projects.
 * @returns {Object} An object containing the projects data, loading state, and error state.
 */
import useSWR from 'swr';
import { GetProjectsResponse } from 'types';

import { fetcher } from '@/utils/fetcher';

export const useProjects = (
  initialData: GetProjectsResponse,
  query: string,
) => {
  let url = `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`;

  // Start with the sort query
  let queryParams = 'sort=-createdAt';

  // If there's an additional query, append it with an ampersand
  if (query !== '') {
    queryParams += '&' + query.slice(1); // slice(1) removes the '?' from the start of the query string
  }

  url += '?' + queryParams; // Append the combined query parameters

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
