'use client';
/**
 * Custom hook leveraging SWR for fetching projects from a Payload CMS backend.
 * It supports fetching all projects or those filtered by tags based on a provided query string.
 *
 * - If `query` is provided (comma-separated tags), it fetches filtered projects from '/filter-by-tags'.
 * - If `query` is empty, it fetches all projects from '/projects'.
 *
 * @param {GetProjectsResponse} initialData - Fallback data used if SWR fetch does not return new data.
 * @param {string} query - Comma-separated tags for filtering or an empty string for no filters.
 * @returns {Object} Contains project data (`data`), loading state (`isLoading`), and error state (`isError`).
 */

import useSWR from 'swr';
import { GetProjectsResponse } from 'types';

import { fetcher } from '@/utils/fetcher';

export const useProjects = (
  initialData: GetProjectsResponse,
  query: string, // string of tags separated by commas
) => {
  // Determine the base URL based on whether a query is provided
  const baseUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`;
  const url =
    query !== ''
      ? `${baseUrl}/filter-by-tags?tags=${query}` // For filtered data
      : baseUrl; // For all projects

  // Use SWR for data fetching with dynamic URL based on the presence of a tags filter
  const { data, error, isLoading } = useSWR(url, fetcher, {
    fallbackData: initialData,
    refreshInterval: 60000, // Optional: adjust or remove as needed
  });
  return {
    data,
    isLoading,
    isError: error,
  };
};
