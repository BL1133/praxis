'use client';

import { Project } from '@payloadTypes';
import React from 'react';
import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

import { ProjectResponse } from './page';

export const Projects: React.FC<{ projects: ProjectResponse }> = ({
  projects,
}) => {
  const useProjects = (initialData: ProjectResponse) => {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`,
      fetcher,
      { fallbackData: initialData },
    );

    return {
      data,
      isLoading,
      isError: error,
    };
  };

  const { data, isError, isLoading } = useProjects(projects);

  if (isError) return <div>Error Loading projects</div>;
  if (isLoading) return <div>Loading projects...</div>;

  return projects.docs.map((project: Project) => (
    <div key={project.id}>
      <h1>{data.title}</h1>
      <h1>{data.description}</h1>
    </div>
  ));
};
